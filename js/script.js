(function ($) {

    const INPUT_TYPE = {
        TEXT: 'text',
        SELECT: 'select',
        COLOR: 'color',
        NUMBER: 'number',
        CHECKBOX: 'checkbox',
    };

    /**
     * Output field
     *
     * @type {*}
     */
    const $OUTPUT = $('#result');

    /**
     * Clears the text of the field_container and returns it.
     * @returns {*}
     */
    function get_field_container() {
        let $container = $('#field_container');
        $container.text('');

        return $container;
    }

    /**
     *  Generates Kirki code for the config
     */
    function generate_config() {
        let id = $('#config_id').val();
        let capability = $('#config_capability').val();
        let option_type = $('#config_option_type').val();

        let str = `Kirki::add_config( '${id}', array(\n`;
        str += `\t'capability'\t=> '${capability}',\n`;
        str += `\t'option_type'\t=> '${option_type}',\n`;
        str += ') );';

        $OUTPUT.text(str);
    }

    /**
     *  Generates Kirki code for a panel
     */
    function generate_panel() {
        let textdomain = $('#textdomain').val();
        let id = $('#panel_id').val();
        let title = $('#panel_title').val();
        let description = $('#panel_description').val();
        let priority = $('#panel_priority').val();

        let str = `Kirki::add_panel( '${id}', array(\n`;
        str += `\t'title'\t\t=> esc_attr__( '${title}', '${textdomain}' ),\n`;
        str += `\t'description'\t=> esc_attr__( '${description}', '${textdomain}' ),\n`;
        str += `\t'priority'\t=> ${priority},\n`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     *  Generates Kirki code for a section
     */
    function generate_section() {
        let textdomain = $('#textdomain').val();
        let id = $('#section_id').val();
        let title = $('#section_title').val();
        let description = $('#section_description').val();
        let priority = $('#section_priority').val();
        let panel = $('#section_panel').val();

        let str = `Kirki::add_section( '${id}', array(\n`;
        str += `\t'title'\t\t=> esc_attr__( '${title}', '${textdomain}' ),\n`;
        str += `\t'description'\t=> esc_attr__( '${description}', '${textdomain}' ),\n`;

        if (panel.length > 0) {
            str += `\t'panel'\t\t=> '${panel}',\n`;
        }

        str += `\t'priority'\t=> ${priority},\n`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Get the field type selected
     * @returns {*}
     */
    function get_field_type() {
        return $('#field_type').val();
    }

    /**
     * Print the correct field type based on which field type is selected
     */
    function show_field_type() {
        let type = get_field_type();

        switch (type) {
            case 'background':
                print_field_background();
                break;
            case 'checkbox':
                print_field_checkbox();
                break;
            case 'code':
                print_field_code();
                break;
            case 'color-palette':
                print_field_color_palette();
                break;
            case 'color':
                print_field_color();
                break;
            case 'text':
                print_field_text();
                return;
        }
    }

    /**
     * Print the default fields for every field
     *
     * @param {string} selector
     */
    function print_field_defaults(selector) {
        print_input(selector, 'Settings', 'field_settings', INPUT_TYPE.TEXT);
        print_input(selector, 'Label', 'field_label', INPUT_TYPE.TEXT);
        print_input(selector, 'Description', 'field_description', INPUT_TYPE.TEXT, 'Will not show in the output if empty.');
        print_input(selector, 'Section', 'field_section', INPUT_TYPE.TEXT);
        print_input(selector, 'Priority', 'field_priority', INPUT_TYPE.NUMBER);
    }

    /**
     * Prints the fields for the text field
     */
    function print_field_text() {
        let $container = get_field_container();

        print_field_defaults($container);
        print_input($container, 'Default', 'field_default', INPUT_TYPE.TEXT);
    }

    /**
     * Prints the fields for the background field
     */
    function print_field_background() {
        let $container = get_field_container();

        print_field_defaults($container);

        print_div($container, 'col-12 mt-3', '<h3>Default:</h3>');

        print_input($container, 'Background Color', 'field_background_color', INPUT_TYPE.COLOR);
        print_input($container, 'Background Image', 'field_background_image', INPUT_TYPE.TEXT);
        print_input($container, 'Background Repeat', 'field_background_repeat', INPUT_TYPE.SELECT, '', [
            'repeat',
            'repeat-x',
            'repeat-y',
            'no-repeat',
            'initial',
            'inherit'
        ]);
        print_input($container, 'Background Position', 'field_background_position', INPUT_TYPE.SELECT, '', [
            'left top',
            'left center',
            'left bottom',
            'right top',
            'right center',
            'right bottom',
            'center top',
            'center center',
            'center bottom'
        ]);
        print_input($container, 'Background Size', 'field_background_size', INPUT_TYPE.SELECT, '', [
            'auto',
            'cover',
            'contain',
            'initial',
            'inherit'
        ]);
        print_input($container, 'Background Attachment', 'field_background_attachment', INPUT_TYPE.SELECT, '', [
            'scroll',
            'fixed',
            'local',
            'initial',
            'inherit'
        ]);
    }

    /**
     * Prints the fields for the checkbox field
     */
    function print_field_checkbox() {
        let $container = get_field_container();

        print_field_defaults($container);

        print_input($container, 'Default', 'field_default', INPUT_TYPE.CHECKBOX);
    }

    /**
     * Prints the fields for the code field
     *
     * TODO: Find more choices? And add as many languages that is supported.
     */
    function print_field_code() {
        let $container = get_field_container();

        print_field_defaults($container);
        print_input($container, 'Default', 'field_default', INPUT_TYPE.TEXT);

        print_div($container, 'col-12 mb-3', '<h3>Choices</h3>');
        print_input($container, 'Language', 'field_language', INPUT_TYPE.SELECT, '', [
            'CSS',
            'HTML',
            'PHP',
            'Javascript',
            'JSON',
        ]);
    }

    /**
     * Prints the fields for the color palette field
     */
    function print_field_color_palette() {
        let $container = get_field_container();

        print_field_defaults($container);
        print_input($container, 'Default', 'field_default', INPUT_TYPE.COLOR);

        print_div($container, 'col-12 mb-3', '<h3>Choices</h3>');

        print_input($container, 'Colors', 'field_colors', INPUT_TYPE.SELECT, 'Please see <a href="https://aristath.github.io/kirki/docs/controls/color-palette.html" target="_blank">Kirki Docs</a> for more information.', [
            'All',
            'Primary',
            'Textdomain',
            'A100',
        ] );

        print_input($container, 'Size', 'field_size', INPUT_TYPE.NUMBER, 'Size in pixels.');
        print_input($container, 'Style', 'field_style', INPUT_TYPE.SELECT, '', [
            'Square',
            'Round',
        ]);
    }

    function print_field_color() {
        let $container = get_field_container();

        print_field_defaults($container);
        print_input($container, 'Default', 'field_default', INPUT_TYPE.COLOR);

        print_div($container, 'col-12 mb-3', '<h3>Choices</h3>');
        print_input($container, 'Alpha', 'field_alpha', INPUT_TYPE.CHECKBOX);
        print_input($container, 'Hue', 'field_hue', INPUT_TYPE.CHECKBOX, 'If you use a hue-only control the saved value will not be a hex or rgba color. Instead the value will be an integer. You can use that value in HSL or HSLA colors in your themes. For more info on HSLA you can read <a href="https://css-tricks.com/yay-for-hsla/" target="_blank">this article</a>');
    }

    /**
     * Print an input field
     *
     * @param {*} selector
     * @param {string} label
     * @param {string} id
     * @param {string} type
     * @param {string} description
     * @param {array} options
     */
    function print_input(selector, label, id, type, description = '', options = []) {
        let str = '';
        str += '<div class="col-3">';
        str += '<div class="form-group">';

        str += '<label for="' + id + '"><strong>' + label + '</strong></label>';
        switch (type) {
            case 'text':
            case 'number':
            case 'color':
                str += '<input type="' + type + '" class="form-control" id="' + id + '" placeholder="' + label + '">';
                break;
            case 'select':
                str += '<select name="' + id + '" id="' + id + '" class="form-control">';
                let first = true;
                // Loop through options
                options.forEach(e => {
                    str += '<option value="' + e.toLowerCase() + '"  ' + ((first) ? 'selected' : '') + '>' + e + '</option>';
                    first = false;
                });
                str += '</select>';
                break;
            case 'checkbox':
                str += '<input type="checkbox" class="custom-checkbox" id="' + id + '">';
                break;
        }

        // If there is a description
        if (description !== '') {
            str += '<small class="text-muted">' + description + '</small>';
        }

        str += '</div><!-- /.form-group -->';
        str += '</div><!-- /.col-3 -->';

        selector.append(str);
    }

    /**
     * Prints a <div> with class and content
     *
     * @param {*} selector
     * @param {string} _class
     * @param {string} content
     */
    function print_div(selector, _class, content = '') {
        selector.append('<div class="' + _class + '">' + content + '</div>');
    }

    /**
     * Generates the correct field based on which field is selected
     */
    function generate_field() {
        let type = get_field_type();

        switch (type) {
            case 'background':
                generate_field_background();
                return;
            case 'checkbox':
                generate_field_checkbox();
                break;
            case 'code':
                generate_field_code();
                break;
            case 'color-palette':
                generate_field_color_palette();
                break;
            case 'color':
                generate_field_color();
                break;
            case 'text':
                generate_field_text();
                return;
        }
    }

    /**
     * Generates all the standard fields for every field, with option to remove the 'default' index
     *
     * @param {boolean} with_default
     * @returns {string}
     */
    function generate_field_standards(with_default = true) {
        let textdomain = $('#textdomain').val();
        let settings = $('#field_settings').val();
        let label = $('#field_label').val();
        let description = $('#field_description').val();
        let section = $('#field_section').val();
        let _default = $('#field_default').val();
        let prior = $('#field_priority').val();

        let str = `Kirki::add_field( '${textdomain}', array(\n`;
        str += `\t'type'\t\t=> '${get_field_type()}',\n`;
        str += `\t'settings'\t=> '${settings}',\n`;
        str += `\t'label'\t\t=> esc_attr__( '${label}', '${textdomain}' ),\n`;

        // If there is a description
        if (description.length > 0) {
            str += `\t'description'\t=> '${description}',\n`;
        }

        str += `\t'section'\t=> '${section}',\n`;

        // Check if we want the default
        if (with_default) {
            str += `\t'default'\t=> '${_default}',\n`;
        }

        str += `\t'priority'\t=> ${prior},\n`;

        return str;
    }

    /**
     * Generates all the fields for a text-field
     */
    function generate_field_text() {
        let textdomain = $('#textdomain').val();
        let settings = $('#field_settings').val();
        let label = $('#field_label').val();
        let description = $('#field_description').val();
        let section = $('#field_section').val();
        let _default = $('#field_default').val();
        let prior = $('#field_priority').val();

        let str = generate_field_standards();

        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Generates all the fields for a background-field
     */
    function generate_field_background() {
        let bg = {
            color: $('#field_background_color').val(),
            image: $('#field_background_image').val(),
            repeat: $('#field_background_repeat').val(),
            position: $('#field_background_position').val(),
            size: $('#field_background_size').val(),
            attachment: $('#field_background_attachment').val()
        };

        let str = generate_field_standards(false);

        str += `\t'default'\t=> array(\n`;
        str += `\t\t'background-color'\t=> '${bg.color}'\n`;
        str += `\t\t'background-image'\t=> '${bg.image}'\n`;
        str += `\t\t'background-repeat'\t=> '${bg.repeat}'\n`;
        str += `\t\t'background-position'\t=> '${bg.position}'\n`;
        str += `\t\t'background-size'\t=> '${bg.size}'\n`;
        str += `\t\t'background-attachment'\t=> '${bg.attachment}'\n`;
        str += `\t),`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Generate all the fields for a checkbox-field
     */
    function generate_field_checkbox() {
        let _default = $('#field_default').is(':checked');

        let str = generate_field_standards(false);
        str += `\t'default'\t=> ${_default},\n`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Generates all the fields for the code-field
     */
    function generate_field_code() {
        let language = $('#field_language').val();

        let str = generate_field_standards();

        str += `\t'choices'\t=> array(\n`;
        str += `\t\t'language'\t=> '${language}',\n`;
        str += `\t),\n`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Generates all the fields for the color-palette-field
     */
    function generate_field_color_palette() {
        let _default = $('#field_default').val();
        let colors = $('#field_colors').val();
        let size = $('#field_size').val();
        let style = $('#field_style').val();

        let str = generate_field_standards(false);
        str += `\t'default'\t=> ${_default},\n`;
        str += `\t'choices'\t=> array(\n`;
        str += `\t\t'colors'\t=> Kirki_Helper::get_material_design_colors( '${colors}' ),\n`;
        str += `\t\t'size'\t\t=> ${size},\n`;

        if ( style === 'round' ) {
            str += `\t\t'style'\t\t=> '${style}',\n`;
        }

        str += `\t),\n`;
        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Generates all the fields for the color-field
     */
    function generate_field_color() {
        let alpha = $('#field_alpha').is(':checked');
        let hue = $('#field_hue').is(':checked');

        let str = generate_field_standards(true);

        // Check if alpha is checked
        if (alpha && !hue) {
            str += `\t'choices'\t=> array(\n`;
            str += `\t\t'alpha'\t=> ${alpha},\n`;
            str += `\t),\n`;
        }

        if (hue) {
            str += `\t'mode'\t\t=> 'hue',\n`;
        }

        str += `) );`;

        $OUTPUT.text(str);
    }

    /**
     * Event listeners
     */
    $('#generate_config').on('click', generate_config);
    $('#generate_panel').on('click', generate_panel);
    $('#generate_section').on('click', generate_section);
    $('#field_type').on('change', show_field_type);
    $('#generate_field').on('click', generate_field);

    // Show the base selected field on the field-tab
    show_field_type();

})(jQuery);