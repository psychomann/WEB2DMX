/* Utilisé dans main.cpp */

#define DMX_CAN_FOR_U 128

/* depuis dmx_output.cpp */

void DMX_Order(int channel, int value);
void DMX_parse_Order(char *payload);

/* depuis lan_httpd.cpp */

void HTTPD_init(void);

void load_404(void);
void load_checkfs(void);
void load_get(void);
void load_dmx_configs(void);
void load_dmx_console(void);
void load_index(void);
void load_dmx_page_render(void);
void load_dmx_setup(void);
void load_dmx_setup_app(void);
void load_dmx_setup_can(void);
void load_dmx_setup_files(void);
void load_dmx_setup_io(void);
void load_dmx_setup_lan(void);
void load_dmx_setup_uni(void);
void load_dmx_setup_val(void);
void load_siomin(void);
void load_css(void);
void load_test(void);
void load_wifi_reset(void);

/* depuis lan_wifi.cpp */

void wifi_setup(void);

/* depuis lan_ws.cpp */

void WebSocket_init(void);

/* depuis main.cpp */
