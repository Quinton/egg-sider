'use strict';

const mock = require('egg-mock');

describe('test/sider.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/sider-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sider')
      .expect(200);
  });
});
