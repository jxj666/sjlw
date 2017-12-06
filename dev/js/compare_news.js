'use strict';

var main = {
    name: 'compare_news',
    toggle: 1,
    mark_1: 0,
    mark_2: 0,
    data: {
        tableClear: true,
        ajax1: {
            name: 'getCompareNews',
            newsId: undefined,
            start: 0,
            size: 20
        },
        ajax2: {
            name: 'compareNews',
            logId: undefined
        }
    },
    //启动
    start: function() {
        common.val_reset();
        common.height_reset();
        common.clearfloat();
        common.getTrumpet();
        common.getPullDownList();
        common.bind_element();
        common.user_show();
        common.getParamObj();
        common.new_role_control();
        main.data.ajax1.newsId = common.theRequest.id;
        $('.nav_list .news').addClass('active');
        ajax_news.getCompareNews(main.data.ajax1, main.table_show);
    },
    //列表显示
    table_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table_show);
        $('.compare_now span').html('\n                    \u3010' + res.context.field + '\u3011 ' + res.context.title + '               \n                ');
        var log = res.context.log;
        var html1 = '';
        for (var i = 0; i < log.length; i++) {
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '"><td><input type="checkbox" name=\'' + (log.length - i)+ '\' value=\'' + log[i].id + '\'  class=\'input1\'></td><td class="type3">                ' + (log.length - i) + '</td><td class="type1">                ' + log[i].createTime + '</td><td class="type3" >                ' + log[i].user.username + '</td><td class="type3">                ' + log[i].action + '</td><td class="type1">                ' + log[i].createTime + '</td><td class="type3">                ' + log[i].ip + '</td></tr>';
        }
        $('.contain_b tbody').html(html1);
    },
    //开始比较
    compare: function() {
        var key = '';
        var mark = '';
        $('.input1').each(function() {
            if ($(this)[0].checked == true) {
                key += $(this).val() + ',';
                mark += $(this).attr('name') + ',';
            }
        });
        if (key.split(',').length == 3) {} else {
            layer.msg('文档对比需要选择两个版本!');
            return;
        }
        main.data.ajax2.logId = key.slice(0, -1);
        var arr = mark.slice(0, -1).split(',');
        main.data.mark_1 = arr[0];
        main.data.mark_2 = arr[1];
        ajax_news.compareNews(main.data.ajax2, main.different);
    },
    //比较内容导入
    different: function(res) {
        var res1 = res.context[0];
        var res2 = res.context[1];
        $('.pop_diff').removeClass('hide');
        $('#a').text(main.code_str(res2));
        $('#b').text(main.code_str(res1));
        $('.pop_diff .explain1').text('版本' + main.data.mark_2);
        $('.pop_diff .explain2').text('版本' + main.data.mark_1);
        $('.class_hign').trigger('click');
    },
    //比较内容导入前处理
    code_str: function(old_str) {
        var new_str = old_str.replace(/<.*?>/, "jxj11111").replace(/<.*?>/, "jxj11111").replace(/<\s*img.*?src="(.*?)".*?\/>/g, "jxj33333  图片 : $1  jxj33333").replace(/<.*?>/g, "jxj22222").replace(/&nbsp;|&lt;|&qt;|&quot;/g, " ").replace(/(jxj11111)+/g, "\n").replace(/(jxj22222)+/g, "\n").replace(/(jxj33333)+/g, "\n");
        return new_str;
    },
    //分页器跳转
    skip_jump: function(data, fun) {
        ajax_news.getCompareNews(data, fun);
    }
};
main.start();
$('.compare_now button').on('click', function() {
    main.compare();
});
$('.hide_diff').on('click', function() {
    $('.pop_diff').addClass('hide');
});
$('.show_toggle').on('click', function() {
    if (main.data.toggle) {
        main.data.toggle = 0;
        $('.show_toggle').text('单屏显示');
    } else {
        main.data.toggle = 1;
        $('.show_toggle').text('多屏显示');
    }
    $('#a').toggleClass('hide');
    $('#b').toggleClass('hide');
    $('.explain_s').toggleClass('hide');
    $('.interval').toggleClass('hide');
});