/**
 * Created by yangjiajun on 15/9/25.
 */

/**
 * 数据持久层 - 记录
 * @type {{qa_list: {first_load: boolean, list: Array, current_page: number, last_page: number}, demo: {isOpen: boolean, count: number, selectedDirection: string}}}
 */
var homeValue = {
    qa_list :   {
        first_load:true,
        list:[],
        current_page:1,
        last_page:1,
    },

    demo    :   {
        isOpen: true,
        count: 0,
        selectedDirection: 'left'
    }
};

export default angular.module('home').value('home.value',homeValue);