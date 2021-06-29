class Language {
	constructor( {code, name, territory} ) {
		this.code = code;
		this.name = name;
		this.territory = territory;
	}
}

class Layout {
	constructor( {name, description, short_description} ) {
		this.name = name;
		this.description = description;
		this.short_description = short_description;
	}
}

class Session {
	constructor( {key, name, comment} ) {
		this.key = key;
		this.name = name;
		this.comment = comment;
	}
}

class User {
	constructor( {display_name, username, language, layout, image, home_directory, session, logged_in} ) {
		this.display_name = display_name;
		this.username = username;
		this.language = language;
		this.layout = layout;
		this.image = image;
		this.home_directory = home_directory;
		this.session = session;
		this.logged_in = logged_in;
	}
}

class Battery {
	constructor( {name, level, status}) {
		this.name = name;
		this.level = level;
		this.status = status;
	}
}

_mockData = {
	languages: [
		Language({
			name: 'English',
			code: 'en_US.utf8',
			territory: 'USA'
		}),
		Language({
			name: 'Catalan',
			code: 'ca_ES.utf8',
			territory: 'Spain'
		}),
		Language({
			name: 'French',
			code: 'fr_FR.utf8',
			territory: 'France'
		})
	],
	layouts: [
		Layout({
			name: 'us',
			short_description: 'en',
			description: 'English (US)'
		}),
		Layout({
			name: 'at',
			short_description: 'de',
			description: 'German (Austria)'
		}),
		Layout({
			name: 'us rus',
			short_description: 'ru',
			description: 'Russian (US, phonetic)'
		})
	],
	sessions: [
		Session({
			key: 'gnome',
			name: 'GNOME',
			comment: 'This session logs you into GNOME'
		}),
		Session({
			key: 'cinnamon',
			name: 'Cinnamon',
			comment: 'This session logs you into Cinnamon'
		}),
		Session({
			key: 'plasma',
			name: 'Plasma',
			comment: 'Plasma by KDE'
		}),
		Session({
			key: 'awesome',
			name: 'Awesome wm',
			comment: 'An Awesome WM'
		}),
		Session({
			key: 'mate',
			name: 'MATE',
			comment: 'This session logs you into MATE'
		}),
		Session({
			key: 'openbox',
			name: 'Openbox',
			comment: 'This session logs you into Openbox'
		})
	],
	users: [
		User({
			display_name: 'Clark Kent',
			username: 'superman',
			language: null,
			layout: null,
			image: '/usr/share/web-greeter/themes/default/img/antergos-logo-user',
			home_directory: '/home/superman',
			session: 'gnome',
			logged_in: false,
		}),
		User({
			display_name: 'Bruce Wayne',
			username: 'batman',
			language: null,
			layout: null,
			image: '/usr/share/web-greeter/themes/default/img/antergos-logo-user',
			home_directory: '/home/batman',
			session: 'cinnamon',
			logged_in: false,
		}),
		User({
			display_name: 'Peter Parker',
			username: 'spiderman',
			language: null,
			layout: null,
			image: '/usr/share/web-greeter/themes/default/img/antergos-logo-user',
			home_directory: '/home/spiderman',
			session: 'MATE',
			logged_in: false,
		})
	],
	battery: Battery({
		name: "Battery 0",
		level: 85,
		state: "Discharging"
	})
}


class Greeter {
	constructor() {
		if ('lightdm' in window) {
			return window.lightdm;
		}

		window.lightdm = this;

		return window.lightdm;
	}

	_authentication_user = null;
	/**
	 * The username of the user being authenticated or {@link null}
	 * if no authentication is in progress
	 * @type {String|Null}
	 * @readonly
	 */
	get authentication_user() {
		return this._authentication_user;
	}

	_autologin_guest = false;
	/**
	 * Whether or not the guest account should be automatically logged
	 * into when the timer expires.
	 * @type {Boolean}
	 * @readonly
	 */
	get autologin_guest() {
		return this._autologin_guest;
	}

	_autologin_timeout = 100;
	/**
	 * The number of seconds to wait before automatically logging in.
	 * @type {Number}
	 * @readonly
	 */
	get autologin_timeout() {
		return this._autologin_timeout;
	}

	_autologin_user = false;
	/**
	 * The username with which to automattically log in when the timer expires.
	 * @type {String}
	 * @readonly
	 */
	get autologin_user() {
		return this._autologin_user;
	}

	_batteryData = _mockData.battery;
	/**
	 * Gets the battery data.
	 * @type {Battery}
	 * @readonly
	 */
	get batteryData() {
		return this._batteryData;
	}

	_brightness = 50;
	/**
	 * Gets the brightness
	 * @type {Number}
	 */
	get brightness() {
		return this._brightness;
	}
	/**
	 * Sets the brightness
	 * @param {Number} quantity The quantity to set
	 */
	set brightness( quantity ) {
		this._brightness = quantity;
	}

	_can_access_battery = true;
	/**
	 * Whether or not the greeter can access to battery data.
	 * @type {boolean}
	 * @readonly
	 */
	get can_access_battery() {
		return this._can_access_battery;
	}

	_can_access_brightness = true;
	/**
	 * Whether or not the greeter can control display brightness.
	 * @type {boolean}
	 * @readonly
	 */
	get can_access_brightness() {
		return this._can_access_brightness;
	}

	_can_hibernate = true;
	/**
	 * Whether or not the greeter can make the system hibernate.
	 * @type {Boolean}
	 * @readonly
	 */
	get can_hibernate() {
		return this._can_hibernate;
	}

	_can_restart = true;
	/**
	 * Whether or not the greeter can make the system restart.
	 * @type {Boolean}
	 * @readonly
	 */
	get can_restart() {
		return this._can_restart;
	}

	_can_shutdown = true;
	/**
	 * Whether or not the greeter can make the system shutdown.
	 * @type {Boolean}
	 * @readonly
	 */
	get can_shutdown() {
		return this._can_shutdown;
	}

	_can_suspend = true;
	/**
	 * Whether or not the greeter can make the system suspend/sleep.
	 * @type {Boolean}
	 * @readonly
	 */
	get can_suspend() {
		return this._can_suspend;
	}

	_default_session = "awesome";
	/**
	 * The name of the default session.
	 * @type {String}
	 * @readonly
	 */
	get default_session() {
		return this._default_session;
	}

	_has_guest_account = false;
	/**
	 * Whether or not guest sessions are supported.
	 * @type {Boolean}
	 * @readonly
	 */
	get has_guest_account() {
		return this._has_guest_account;
	}

	_hide_users_hint = false;
	/**
	 * Whether or not user accounts should be hidden.
	 * @type {Boolean}
	 * @readonly
	 */
	get hide_users_hint() {
		return this._hide_users_hint;
	}

	_hostname = "Web browser";
	/**
	 * The system's hostname.
	 * @type {String}
	 * @readonly
	 */
	get hostname() {
		return this._hostname;
	}

	_in_authentication = false;
	/**
	 * Whether or not the greeter is in the process of authenticating.
	 * @type {Boolean}
	 * @readonly
	 */
	get in_authentication() {
		return this._in_authentication;
	}

	_is_authenticated = true;
	/**
	 * Whether or not the greeter has successfully authenticated.
	 * @type {Boolean}
	 * @readonly
	 */
	get is_authenticated() {
		return this._is_authenticated;
	}

	_language = null;
	/**
	 * The current language or {@link null} if no language.
	 * @type {Language|null}
	 * @readonly
	 */
	get language() {
		return this._language;
	}

	_languages = _mockData.languages;
	/**
	 * A list of languages to present to the user.
	 * @type {Language[]}
	 * @readonly
	 */
	get languages() {
		return this._languages;
	}

	_layout = _mockData.layouts[0];
	/**
	 * The currently active layout for the selected user.
	 * @type {Layout}
	 */
	get layout() {
		return this._layout;
	}

	_layouts = _mockData.layouts;
	/**
	 * A list of keyboard layouts to present to the user.
	 * @type {Layout[]}
	 * @readonly
	 */
	get layouts() {
		return this._layouts;
	}

	_lock_hint = false;
	/**
	 * Whether or not the greeter was started as a lock screen.
	 * @type {Boolean}
	 * @readonly
	 */
	get lock_hint() {
		return this._lock_hint;
	}

	_select_guest_hint = false;
	/**
	 * Whether or not the guest account should be selected by default.
	 * @type {Boolean}
	 * @readonly
	 */
	get select_guest_hint() {
		return this.select_guest_hint;
	}

	_select_user_hint = "";
	/**
	 * The username to select by default.
	 * @type {String}
	 * @readonly
	 */
	get select_user_hint() {
		return this.select_user_hint;
	}

	_sessions = _mockData.sessions;
	/**
	 * List of available sessions.
	 * @type {Session[]}
	 * @readonly
	 */
	get sessions() {
		return this._sessions;
	}

	_show_manual_login_hint = false;
	/**
	 * Check if a manual login option should be shown. If {@link true}, the theme should
	 * provide a way for a username to be entered manually. Otherwise, themes that show
	 * a user list may limit logins to only those users.
	 * @type {Boolean}
	 * @readonly
	 */
	get show_manual_login_hint() {
		return this._show_manual_login_hint;
	}

	_show_remote_login_hint = false;
	/**
	 * Check if a remote login option should be shown. If {@link true}, the theme should provide
	 * a way for a user to log into a remote desktop server.
	 * @type {Boolean}
	 * @readonly
	 * @internal
	 */
	get show_remote_login_hint() {
		return this._show_remote_login_hint;
	}

	_users = _mockData.users;
	/**
	 * List of available users.
	 * @type {User[]}
	 * @readonly
	 */
	get users() {
		return this.authentication_user;
	}

	/**
	 * Starts the authentication procedure for a user.
	 *
	 * @param {String|null} username A username or {@link null} to prompt for a username.
	 */
	authenticate( username ) {
	}

	/**
	 * Starts the authentication procedure for the guest user.
	 */
	authenticate_as_guest() {
	}

	/**
	 * Updates the battery data
	 */
	batteryUpdate() {
	}

	/**
	 * Set the brightness to quantity
	 * @param {Number} quantity The quantity to set
	 */
	brightnessSet( quantity ) {
	}

	/**
	 * Increase the brightness by quantity
	 * @param {Number} quantity The quantity to increase
	 */
	brightnessIncrease( quantity ) {
	}

	/**
	 * Decrease the brightness by quantity
	 * @param {Number} quantity The quantity to decrease
	 */
	brightnessDecrease( quantity ) {
	}

	/**
	 * Cancel user authentication that is currently in progress.
	 */
	cancel_authentication() {
	}

	/**
	 * Cancel the automatic login.
	 */
	cancel_autologin() {
	}

	/**
	 * Get the value of a hint.
	 * @param {String} name The name of the hint to get.
	 * @returns {String|Boolean|Number|null}
	 */
	get_hint( name ) {
	}

	/**
	 * Triggers the system to hibernate.
	 * @returns {Boolean} {@link true} if hibernation initiated, otherwise {@link false}
	 */
	hibernate() {
	}

	/**
	 * Provide a response to a prompt.
	 * @param {*} response
	 */
	respond( response ) {
	}

	/**
	 * Triggers the system to restart.
	 * @returns {Boolean} {@link true} if restart initiated, otherwise {@link false}
	 */
	restart() {
	}

	/**
	 * Set the language for the currently authenticated user.
	 * @param {String} language The language in the form of a locale specification (e.g.
	 *     'de_DE.UTF-8')
	 * @returns {Boolean} {@link true} if successful, otherwise {@link false}
	 */
	set_language( language ) {
	}

	/**
	 * Triggers the system to shutdown.
	 * @returns {Boolean} {@link true} if shutdown initiated, otherwise {@link false}
	 */
	shutdown() {
	}

	/**
	 * Start a session for the authenticated user.
	 * @param {String|null} session The session to log into or {@link null} to use the default.
	 * @returns {Boolean} {@link true} if successful, otherwise {@link false}
	 */
	start_session( session ) {
	}

	/**
	 * Triggers the system to suspend/sleep.
	 * @returns {Boolean} {@link true} if suspend/sleep initiated, otherwise {@link false}
	 */
	suspend() {}

}

class GreeterConfig {
	constructor() {
		if ('greeter_config' in window) {
			return window.greeter_config;
		}

		window.greeter_config = this;
	}

	_branding = {
		background_images_dir: "/usr/share/backgrounds",
		logo_image: "/usr/share/web-greeter/themes/default/img/antergos-logo-user.png",
		user_image: "/usr/share/web-greeter/themes/default/img/antergos.png"
	}

	_greeter = {
		debug_mode: true,
		detect_theme_errors: true,
		screensaver_timeout: 300,
		secure_mode: true,
		time_format: "LT",
		time_language: "auto",
		theme: "none"
	}

	_features = {
		battery: true,
		backlight: {
			enabled: true,
			value: 10,
			steps: 0
		}
	}

	/**
	 * Holds keys/values from the `branding` section of the config file.
	 *
	 * @type {object} branding
	 * @property {string} background_images_dir Path to directory that contains background images
	 *                                      for use in greeter themes.
	 * @property {string} logo                  Path to distro logo image for use in greeter themes.
	 * @property {string} user_image            Default user image/avatar. This is used by greeter themes
	 *                                      for users that have not configured a `.face` image.
	 * @readonly
	 */
	get branding() {
		return this._branding;
	}

	/**
	 * Holds keys/values from the `greeter` section of the config file.
	 *
	 * @type {object}  greeter
	 * @property {boolean} debug_mode          Greeter theme debug mode.
	 * @property {boolean} detect_theme_errors Provide an option to load a fallback theme when theme
	 *                                     errors are detected.
	 * @property {number}  screensaver_timeout Blank the screen after this many seconds of inactivity.
	 * @property {boolean} secure_mode         Don't allow themes to make remote http requests.
	 * @property {string}  time_format         A moment.js format string to be used by the greeter to
	 *                                     generate localized time for display.
	 * @property {string}  time_language       Language to use when displaying the time or `auto`
	 *                                     to use the system's language.
	 * @property {string}  theme               The name of the theme to be used by the greeter.
	 * @readonly
	 */
	get greeter() {
		return this._greeter;
	}

	/**
	 * Holds keys/values from the `features` section of the config file.
	 *
	 * @type {Object}      features
	 * @property {Boolean} battery				 Enable greeter and themes to ger battery status.
	 * @property {Object}  backlight
	 * @property {Boolean} enabled				 Enable greeter and themes to control display backlight.
	 * @property {Number}  value					 The amount to increase/decrease brightness by greeter.
	 * @property {Number}  steps					 How many steps are needed to do the change.
	 */
	get features() {
		return this._features;
	}

}

class ThemeUtils {
	constructor() {
		if ("theme_utils" in window) {
			return window.theme_utils;
		}

		moment.locale( window.navigator.languages )

		localized_invalid_date = moment('today', '!@#');

	}

	/**
	 * Binds `this` to class, `context`, for all of the class's methods.
	 *
	 * @arg {object} context An ES6 class instance with at least one method.
	 *
	 * @return {object} `context` with `this` bound to it for all of its methods.
	 */
	bind_this( context ) {
		let excluded_methods = ['constructor'];

		function not_excluded( _method, _context ) {
			let is_excluded = excluded_methods.findIndex( excluded_method => _method === excluded_method ) > -1,
				is_method = 'function' === typeof _context[_method];

			return is_method && !is_excluded;
		}

		for ( let obj = context; obj; obj = Object.getPrototypeOf( obj ) ) {
			// Stop once we have traveled all the way up the inheritance chain
			if ( 'Object' === obj.constructor.name ) {
				break;
			}

			for ( let method of Object.getOwnPropertyNames( obj ) ) {
				if ( not_excluded( method, context ) ) {
					context[method] = context[method].bind( context );
				}
			}
		}

		return context;
	}

	dirlist() {
		return []
	}

	/**
	 * Get the current time in a localized format. Time format and language are auto-detected
	 * by default, but can be set manually in the greeter config file.
	 *   * `language` defaults to the system's language, but can be set manually in the config file.
	 *   * When `time_format` config file option has a valid value, time will be formatted
	 *     according to that value.
	 *   * When `time_format` does not have a valid value, the time format will be `LT`
	 *     which is `1:00 PM` or `13:00` depending on the system's locale.
	 *
	 * @return {string} The current localized time.
	 */
	get_current_localized_time() {
		if ( null === time_language ) {
			let config = greeter_config.greeter,
				manual_language = ( '' !== config.time_language && 'auto' !== config.time_language ),
				manual_time_format = ( '' !== config.time_format && 'auto' !== config.time_format );

			time_language =  manual_language ? config.time_language : window.navigator.language;
			time_format = manual_time_format ? config.time_format : 'LT';

			if ( manual_language ) {
				moment.locale( time_language );
			}
		}

		let local_time = moment().format( time_format );

		if ( local_time === localized_invalid_date ) {
			local_time = moment().format( 'LT' );
		}

		return local_time;
	}
}


new ThemeUtils();
new GreeterConfig();
new Greeter();
