/* tslint:disable */
/* eslint-disable */
/**
 *
 * The version of the OpenAPI document: 1.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration';
import globalAxios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 *
 * @export
 * @interface ConfigureConnectorRequest
 */
export interface ConfigureConnectorRequest {
  /**
   *
   * @type {boolean}
   * @memberof ConfigureConnectorRequest
   */
  configured: boolean;
}
/**
 *
 * @export
 * @enum {string}
 */

export const ConnectorTypeResponse = {
  Commercial: 'Commercial',
  ServiceTitan: 'ServiceTitan',
  Residential: 'Residential',
  Construction: 'Construction',
} as const;

export type ConnectorTypeResponse =
  (typeof ConnectorTypeResponse)[keyof typeof ConnectorTypeResponse];

/**
 *
 * @export
 * @interface HealthCheckOutput
 */
export interface HealthCheckOutput {
  /**
   *
   * @type {string}
   * @memberof HealthCheckOutput
   */
  app: string;
  /**
   *
   * @type {string}
   * @memberof HealthCheckOutput
   */
  version: string;
  /**
   *
   * @type {HealthCheckOutputEnv}
   * @memberof HealthCheckOutput
   */
  env: HealthCheckOutputEnv;
  /**
   *
   * @type {string}
   * @memberof HealthCheckOutput
   */
  log_level: string;
}
/**
 *
 * @export
 * @interface HealthCheckOutputEnv
 */
export interface HealthCheckOutputEnv {
  /**
   *
   * @type {string}
   * @memberof HealthCheckOutputEnv
   */
  node_env: string;
}
/**
 * Represents a client connector response.
 * @export
 * @interface IClientConnectorResponse
 */
export interface IClientConnectorResponse {
  /**
   * The ID of the connector.
   * @type {string}
   * @memberof IClientConnectorResponse
   */
  id: string;
  /**
   * The name of the connector.
   * @type {string}
   * @memberof IClientConnectorResponse
   */
  name: string;
  /**
   * The description of the connector.
   * @type {string}
   * @memberof IClientConnectorResponse
   */
  description: string;
  /**
   *
   * @type {ConnectorTypeResponse}
   * @memberof IClientConnectorResponse
   */
  type: ConnectorTypeResponse;
  /**
   * The logo URL or Base64 picture of the connector.
   * @type {string}
   * @memberof IClientConnectorResponse
   */
  logo: string;
  /**
   * Indicates whether the connector is configured.
   * @type {boolean}
   * @memberof IClientConnectorResponse
   */
  configured: boolean;
}
/**
 *
 * @export
 * @interface PagedResponseIClientConnectorResponse
 */
export interface PagedResponseIClientConnectorResponse {
  /**
   * Requested data.
   * @type {Array<IClientConnectorResponse>}
   * @memberof PagedResponseIClientConnectorResponse
   */
  data: Array<IClientConnectorResponse>;
  /**
   * Current page. Starts from 1. Default is 1.
   * @type {number}
   * @memberof PagedResponseIClientConnectorResponse
   */
  page: number;
  /**
   * Page size.
   * @type {number}
   * @memberof PagedResponseIClientConnectorResponse
   */
  pageSize: number;
  /**
   * Has more items to load.
   * @type {boolean}
   * @memberof PagedResponseIClientConnectorResponse
   */
  hasMore: boolean;
  /**
   * Total count of items can be set if computed.
   * @type {number}
   * @memberof PagedResponseIClientConnectorResponse
   */
  totalCount?: number;
}

/**
 * ConnectorsApi - axios parameter creator
 * @export
 */
export const ConnectorsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     *
     * @summary Connector configuration
     * @param {string} clientId
     * @param {string} connectorId
     * @param {ConfigureConnectorRequest} configureConnectorRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    configureConnector: async (
      clientId: string,
      connectorId: string,
      configureConnectorRequest: ConfigureConnectorRequest,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'clientId' is not null or undefined
      assertParamExists('configureConnector', 'clientId', clientId);
      // verify required parameter 'connectorId' is not null or undefined
      assertParamExists('configureConnector', 'connectorId', connectorId);
      // verify required parameter 'configureConnectorRequest' is not null or undefined
      assertParamExists(
        'configureConnector',
        'configureConnectorRequest',
        configureConnectorRequest,
      );
      const localVarPath = `/v1/users/{clientId}/connectors/{connectorId}`
        .replace(`{${'clientId'}}`, encodeURIComponent(String(clientId)))
        .replace(`{${'connectorId'}}`, encodeURIComponent(String(connectorId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'PUT',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        configureConnectorRequest,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Connector search
     * @param {string} clientId
     * @param {number} [page] Page number starting at 1
     * @param {number} [pageSize] Number of records per-page; default 50, max 100
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    connectorSearch: async (
      clientId: string,
      page?: number,
      pageSize?: number,
      search?: string,
      options: AxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'clientId' is not null or undefined
      assertParamExists('connectorSearch', 'clientId', clientId);
      const localVarPath = `/v1/users/{clientId}/connectors`.replace(
        `{${'clientId'}}`,
        encodeURIComponent(String(clientId)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (pageSize !== undefined) {
        localVarQueryParameter['pageSize'] = pageSize;
      }

      if (search !== undefined) {
        localVarQueryParameter['search'] = search;
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * ConnectorsApi - functional programming interface
 * @export
 */
export const ConnectorsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    ConnectorsApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @summary Connector configuration
     * @param {string} clientId
     * @param {string} connectorId
     * @param {ConfigureConnectorRequest} configureConnectorRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async configureConnector(
      clientId: string,
      connectorId: string,
      configureConnectorRequest: ConfigureConnectorRequest,
      options?: AxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.configureConnector(
          clientId,
          connectorId,
          configureConnectorRequest,
          options,
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
    /**
     *
     * @summary Connector search
     * @param {string} clientId
     * @param {number} [page] Page number starting at 1
     * @param {number} [pageSize] Number of records per-page; default 50, max 100
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async connectorSearch(
      clientId: string,
      page?: number,
      pageSize?: number,
      search?: string,
      options?: AxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<PagedResponseIClientConnectorResponse>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.connectorSearch(
        clientId,
        page,
        pageSize,
        search,
        options,
      );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration,
      );
    },
  };
};

/**
 * ConnectorsApi - factory interface
 * @export
 */
export const ConnectorsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = ConnectorsApiFp(configuration);
  return {
    /**
     *
     * @summary Connector configuration
     * @param {string} clientId
     * @param {string} connectorId
     * @param {ConfigureConnectorRequest} configureConnectorRequest
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    configureConnector(
      clientId: string,
      connectorId: string,
      configureConnectorRequest: ConfigureConnectorRequest,
      options?: any,
    ): AxiosPromise<void> {
      return localVarFp
        .configureConnector(
          clientId,
          connectorId,
          configureConnectorRequest,
          options,
        )
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Connector search
     * @param {string} clientId
     * @param {number} [page] Page number starting at 1
     * @param {number} [pageSize] Number of records per-page; default 50, max 100
     * @param {string} [search]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    connectorSearch(
      clientId: string,
      page?: number,
      pageSize?: number,
      search?: string,
      options?: any,
    ): AxiosPromise<PagedResponseIClientConnectorResponse> {
      return localVarFp
        .connectorSearch(clientId, page, pageSize, search, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * ConnectorsApi - object-oriented interface
 * @export
 * @class ConnectorsApi
 * @extends {BaseAPI}
 */
export class ConnectorsApi extends BaseAPI {
  /**
   *
   * @summary Connector configuration
   * @param {string} clientId
   * @param {string} connectorId
   * @param {ConfigureConnectorRequest} configureConnectorRequest
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ConnectorsApi
   */
  public configureConnector(
    clientId: string,
    connectorId: string,
    configureConnectorRequest: ConfigureConnectorRequest,
    options?: AxiosRequestConfig,
  ) {
    return ConnectorsApiFp(this.configuration)
      .configureConnector(
        clientId,
        connectorId,
        configureConnectorRequest,
        options,
      )
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @summary Connector search
   * @param {string} clientId
   * @param {number} [page] Page number starting at 1
   * @param {number} [pageSize] Number of records per-page; default 50, max 100
   * @param {string} [search]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ConnectorsApi
   */
  public connectorSearch(
    clientId: string,
    page?: number,
    pageSize?: number,
    search?: string,
    options?: AxiosRequestConfig,
  ) {
    return ConnectorsApiFp(this.configuration)
      .connectorSearch(clientId, page, pageSize, search, options)
      .then((request) => request(this.axios, this.basePath));
  }
}