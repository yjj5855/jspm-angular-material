/**
 * Created by yangjiajun on 15/11/2.
 */
import 'test/helper';
import core from 'source/core/weixin/core-module'

describe('［模块］：CoreModule', () => {
    it('具有正确的模块名称', () => {
        expect(core.name).to.equal('myApp')
    })
})