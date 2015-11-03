/**
 * Created by yangjiajun on 15/11/2.
 */
import 'test/helper'
import $ from 'jquery'
import 'angular';

describe('［应用］：Angular Application 初始化', () => {
    it('检查 jquery 有没有引入', () => {
        expect($ != undefined).to.equal(true)
    })
    it('检查 angular 有没有引入', () => {
        expect(angular != undefined).to.equal(true)
    })
});