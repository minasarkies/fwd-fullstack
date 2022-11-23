'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const supertest_1 = __importDefault(require('supertest')); // We import supertest to test if the endpoint is working correctly
const express_1 = __importDefault(require('express')); // We are simply creating a sort of dummy server in order to test the app
const exists_1 = __importDefault(require('../../routers/exists')); //Importing router1 here from the exists.ts file
const app = (0, express_1.default)();
app.use('/resizeavailable', exists_1.default);
const request = (0, supertest_1.default)(app);
describe('Available - Endpoint Tests', () => {
  it('should return an array containing available images', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const response = yield request.get('/resizeavailable');
      // const data = await response.json()
      const data = JSON.parse(response.text);
      expect(data).toContain('icelandwaterfall');
    }));
});
