/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { PatternsRequestBuilderRequestsMetadata, type PatternsRequestBuilder } from './patterns/index.js';
// @ts-ignore
import { type BaseRequestBuilder, type KeysToExcludeForNavigationMetadata, type NavigationMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /api
 */
export interface ApiRequestBuilder extends BaseRequestBuilder<ApiRequestBuilder> {
    /**
     * The Patterns property
     */
    get patterns(): PatternsRequestBuilder;
}
/**
 * Uri template for the request builder.
 */
export const ApiRequestBuilderUriTemplate = "{+baseurl}/api";
/**
 * Metadata for all the navigation properties in the request builder.
 */
export const ApiRequestBuilderNavigationMetadata: Record<Exclude<keyof ApiRequestBuilder, KeysToExcludeForNavigationMetadata>, NavigationMetadata> = {
    patterns: {
        requestsMetadata: PatternsRequestBuilderRequestsMetadata,
    },
};
/* tslint:enable */
/* eslint-enable */
