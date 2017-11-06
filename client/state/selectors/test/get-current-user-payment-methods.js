/** @format */

jest.mock( 'lib/abtest', () => ( { abtest: require( 'sinon' ).stub() } ) );

/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import { getCurrentUserPaymentMethods } from '../';
import { abtest } from 'lib/abtest';

describe( 'getCurrentUserPaymentMethods()', () => {
	const enLangUsCountryState = {
		geo: {
			geo: {
				country_short: 'US',
			},
		},

		users: {
			items: {
				73705554: { ID: 73705554, login: 'testonesite2014', localeSlug: 'en' },
			},
		},

		currentUser: {
			id: 73705554,
		},
	};

	const enLangDeCountryState = {
		geo: {
			geo: {
				country_short: 'DE',
			},
		},

		users: {
			items: {
				73705554: { ID: 73705554, login: 'testonesite2014', localeSlug: 'en' },
			},
		},

		currentUser: {
			id: 73705554,
		},
	};

	const deLangDeCountryState = {
		geo: {
			geo: {
				country_short: 'DE',
			},
		},

		users: {
			items: {
				73705554: { ID: 73705554, login: 'testonesite2014', localeSlug: 'de' },
			},
		},

		currentUser: {
			id: 73705554,
		},
	};

	const nlCountryState = {
		geo: {
			geo: {
				country_short: 'NL',
			},
		},

		users: {
			items: {
				73705554: { ID: 73705554, login: 'testonesite2014', localeSlug: 'nl' },
			},
		},

		currentUser: {
			id: 73705554,
		},
	};

	const frLangFRCountryState = {
		geo: {
			geo: {
				country_short: 'FR',
			},
		},

		users: {
			items: {
				73705554: { ID: 73705554, login: 'testonesite2014', localeSlug: 'fr' },
			},
		},

		currentUser: {
			id: 73705554,
		},
	};

	test( 'en-US should return credit card primary, PayPal secondary', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'hide' );
		expect( getCurrentUserPaymentMethods( enLangUsCountryState ) ).to.eql( [
			'credit-card',
			'paypal',
		] );
	} );

	test( 'en-DE should return CC, GiroPay, Paypal', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'show' );
		expect( getCurrentUserPaymentMethods( enLangDeCountryState ) ).to.eql( [
			'credit-card',
			'giropay',
			'paypal',
		] );
	} );

	test( 'de-DE should return CC, Giropay, Paypal', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'show' );
		expect( getCurrentUserPaymentMethods( deLangDeCountryState ) ).to.eql( [
			'credit-card',
			'giropay',
			'paypal',
		] );
	} );

	test( 'de-DE with test as hide should return return CC, Paypal', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'hide' );
		expect( getCurrentUserPaymentMethods( deLangDeCountryState ) ).to.eql( [
			'credit-card',
			'paypal',
		] );
	} );

	test( 'nl-NL should return credit card, iDEAL, PayPal ', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'hide' );
		expect( getCurrentUserPaymentMethods( nlCountryState ) ).to.eql( [
			'credit-card',
			'ideal',
			'paypal',
		] );
	} );

	test( 'fr-FR should return credit card primary, PayPal secondary', () => {
		abtest.withArgs( 'showGiropayPaymentMethod' ).returns( 'hide' );
		expect( getCurrentUserPaymentMethods( frLangFRCountryState ) ).to.eql( [
			'credit-card',
			'paypal',
		] );
	} );
} );
