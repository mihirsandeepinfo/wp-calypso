/**
 * External dependencies
 *
 * @format
 */

import { get, find } from 'lodash';

/**
 * Internal dependencies
 */
import { getSelectedSiteId } from 'state/ui/selectors';
import { getSerializedProductsQuery } from './utils';

export const getProduct = ( state, productId, siteId = getSelectedSiteId( state ) ) => {
	const allProducts = get( state, [
		'extensions',
		'woocommerce',
		'sites',
		siteId,
		'products',
		'products',
	] );
	return find( allProducts, { id: productId } );
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [params] Params given to API request. Defaults to { page: 1, per_page: 10 }
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {boolean} Whether the products list for a requested page has been successfully loaded from the server
 */
export const areProductsLoaded = ( state, params = {}, siteId = getSelectedSiteId( state ) ) => {
	const key = getSerializedProductsQuery( params );
	const isLoading = get( state, [
		'extensions',
		'woocommerce',
		'sites',
		siteId,
		'products',
		'isLoading',
		key,
	] );
	// Strict check because it could also be undefined.
	return false === isLoading;
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [params] Params given to API request. Defaults to { page: 1, per_page: 10 }
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {boolean} Whether the products list for a request page is currently being retrieved from the server
 */
export const areProductsLoading = ( state, params = {}, siteId = getSelectedSiteId( state ) ) => {
	const key = getSerializedProductsQuery( params );
	const isLoadingKey = get( state, [
		'extensions',
		'woocommerce',
		'sites',
		siteId,
		'products',
		'isLoading',
		key,
	] );
	// Strict check because it could also be undefined.
	return true === isLoadingKey;
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [params] Params given to API request. Defaults to { page: 1, per_page: 10 }
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Number} Total number of pages of products available on a site, or 0 if not loaded yet.
 */
export const getTotalProductsPages = (
	state,
	params = {},
	siteId = getSelectedSiteId( state )
) => {
	const key = getSerializedProductsQuery( params );
	return get(
		state,
		[ 'extensions', 'woocommerce', 'sites', siteId, 'products', 'totalPages', key ],
		0
	);
};

/**
 * @param {Object} state Whole Redux state tree
 * @param {Number} [params] Params given to API request. Defaults to { page: 1, per_page: 10 }
 * @param {Number} [siteId] Site ID to check. If not provided, the Site ID selected in the UI will be used
 * @return {Number} Total number of products available on a site, or 0 if not loaded yet.
 */
export const getTotalProducts = ( state, params = {}, siteId = getSelectedSiteId( state ) ) => {
	const key = getSerializedProductsQuery( params );
	return get(
		state,
		[ 'extensions', 'woocommerce', 'sites', siteId, 'products', 'totalProducts', key ],
		0
	);
};
