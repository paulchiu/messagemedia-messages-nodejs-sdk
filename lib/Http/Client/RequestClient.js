
'use strict';

const HttpContext = require('./HttpContext');
const HttpResponse = require('../Response/HttpResponse');
const axios = require('axios');
const FormData = require('form-data');
const APIHelper = require('../../APIHelper');

const appendFormData = function appendFormData(form, data) {
    const dataArray = APIHelper.formDataEncodeObject(data);
    for (let index = 0; index < dataArray.length; index += 1) {
        if (Object.prototype.hasOwnProperty.call(dataArray, index)) {
            const key = dataArray[index].key;
            const value = dataArray[index].value;
            form.append(key, value);
        }
    }
};

const convertToAxiosRequest = function convertToAxiosRequest(req) {
    const headers = APIHelper.merge({}, req.headers || {});
    let requestBody;

    if (req.formData) {
        const form = new FormData();
        appendFormData(form, req.formData);
        requestBody = form;
        APIHelper.merge(headers, form.getHeaders());
    } else if (req.form) {
        requestBody = APIHelper.urlEncodeObject(req.form);
        headers['content-type'] = 'application/x-www-form-urlencoded';
    } else if (req.body !== undefined && req.body !== null) {
        requestBody = req.body;
    }

    const options = {
        url: req.queryUrl,
        method: req.method,
        headers,
        data: requestBody,
        responseType: 'text',
        transformResponse: [data => data],
        validateStatus: () => true,
    };

    if (req.username) {
        options.auth = {
            username: req.username,
            password: req.password,
        };
    }

    return options;
};

const convertHttpResponse = function convertHttpResponse(resp) {
    const response = new HttpResponse();
    if (resp) {
        response.body = resp.data;
        response.headers = resp.headers;
        response.statusCode = resp.status;
    }

    return response;
};

/**
 * Execute a given HttpRequest to get string response back
 * @param    {HttpRequest | HttpBodyRequest}  req    The query string builder to replace the
 *                                                   template parameters
 * @param   {function}    callback   Callback function to execute when request completes or fails
 * @param   {Array} parameters    The parameters to replace in the queryBuilder
 * @returns {void}                Does not return anything
 */
const executeRequest = function executeRequest(req, callback) {
    // convert abstracted request to axios request
    const convertedRequest = convertToAxiosRequest(req);
    const context = new HttpContext();
    context.request = req;

    axios(convertedRequest)
        .then((res) => {
            const response = convertHttpResponse(res);
            context.response = response;
            callback(null, response, context);
        })
        .catch((error) => {
            const response = convertHttpResponse(error.response);
            context.response = response;
            callback(error, response, context);
        });
};
module.exports = executeRequest;
