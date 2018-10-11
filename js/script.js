(function ($) {

    let $result = $('#result');

    function generate_config() {
        let id = $('#config_id').val();
        let capability = $('#config_capability').val();
        let option_type = $('#config_option_type').val();

        let str = `Kirki::add_config( '${id}', array(\n`;
        str += `\t'capability'\t=> '${capability}',\n`;
        str += `\t'option_type'\t=> '${option_type}',\n`;
        str += ') );';

        $result.text(str);
    }

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

        $result.text(str);
    }

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
        if ( panel.length > 0 ) {
            str += `\t'panel'\t\t=> '${panel}',\n`;
        }
        str += `\t'priority'\t=> ${priority},\n`;
        str += `) );`;

        $result.text(str);
    }

    function get_field_type() {
        return $('#field_type').val();
    }

    function show_field_type() {
        let type = get_field_type();

        switch ( type ) {
            case 'text':
                show_field_type_text();
                return;
        }
    }

    function show_field_type_text() {
        $container = $('#field_container');

        print_input( $container, 'Settings', 'field_settings', 'text' );
        print_input( $container, 'Label', 'field_label', 'text' );
        print_input( $container, 'Description', 'field_description', 'text' );
        print_input( $container, 'Section', 'field_section', 'text' );
        print_input( $container, 'Default', 'field_default', 'text' );
        print_input( $container, 'Priority', 'field_priority', 'number' );
    }

    function print_input( selector, label, id, inputType, description = '' ) {
        let str = '';
        str += '<div class="col-3">';
        str += '<div class="form-group">';
        str += '<label for="'+id+'"><strong>'+label+'</strong></label>';
        str += '<input type="'+inputType+'" class="form-control" id="'+id+'" placeholder="'+label+'">';
        if ( description !== '' ) {
            str += '<small class="text-muted">'+description+'</small>';
        }
        str += '</div><!-- /.form-group -->';
        str += '</div><!-- /.col-3 -->';

        selector.append(str);
    }

    function generate_field() {
        let type = get_field_type();

        switch ( type ) {
            case 'text':
                generate_field_text();
        }
    }

    function generate_field_text() {
        let textdomain = $('#textdomain').val();
        let settings = $('#field_settings').val();
        let label = $('#field_label').val();
        let description = $('#field_description').val();
        let section = $('#field_section').val();
        let _default = $('#field_default').val();
        let prior = $('#field_priority').val();

        let str = `Kirki::add_field( '${textdomain}', array(\n`;
        str += `\t'type'\t\t=> 'text',\n`;
        str += `\t'settings'\t=> '${settings}',\n`;
        str += `\t'label'\t\t=> esc_attr__( '${label}', '${textdomain}' ),\n`;
        if ( description.length > 0 ) {
            str += `\t'description'\t=> '${description}',\n`;
        }
        str += `\t'section'\t=> '${section}',\n`;
        str += `\t'default'\t=> '${_default}',\n`;
        str += `\t'priority'\t=> ${prior},\n`;
        str += `) );`;

        $result.text(str);
    }

    $('#generate_config').on('click', generate_config);
    $('#generate_panel').on('click', generate_panel);
    $('#generate_section').on('click', generate_section);
    $('#field_type').on('change', show_field_type);
    $('#generate_field').on('click', generate_field);

})(jQuery);