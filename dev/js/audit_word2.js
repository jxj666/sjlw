'use strict';

var main = {
    name: 'audit_word',
    data: {
        search: true,
        tableClear: true,
        table: 1,
        isAsign: 0,
        ajax1: {
            name: 'getReviewNews',
            context: undefined,
            publishUid: undefined,
            field: undefined,
            stage: undefined,
            type: undefined,
            isAsign: 0,
            start: 0,
            size: 20,
            storeType: 2
        },
        ajax2: {
            name: 'asignNews',
            newsId: undefined,
            asignUid: undefined,
            stage: undefined
        },
        ajax3: {
            name: 'getUsers',
            roleId: ''
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
        common.getAllAuthor();
        common.new_role_control();
        main.role_control();
        main.data.ajax1.uid = common.k;
        main.data.ajax2.uid = common.k;
        main.data.ajax3.uid = common.k;
        common.data.storeType=2;
        $('#s_field').hide();
        $('.item6').addClass('active');
        $('.switch1').addClass('active');

        $('.nav_list .news').addClass('active');
        ajax_cms.getReviewNews(main.data.ajax1, main.table12_show);
    },
    //角色管理
    role_control: function() {
        if (common.role.val14) { //一审 
            main.data.ajax1.stage = 0;
            return;
        } else if (common.role.val15) { //二审
            main.data.ajax1.stage = 1;
            $('.auid .ys_exam2').addClass('active');
            return;
        } else if (common.role.val16) { //签发
            $('.audit2').hide();

            main.data.ajax1.stage = 2;
            $('.auid .ys_exam3').addClass('active');
            return;
        }
    },
    //指派选择
    pop_select_show: function(res) {
        var data = JSON.parse(res.context);
        var users = data.rows || [];
        var html1 = '';
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == $('.val3').text()) {
                continue;
            }
            html1 += '<option value=\'' + users[i].id + ':' + users[i].roleId + '\' >' + users[i].name + '</option>';
        }
        $('.pop select').html(html1);
    },
    //列表显示
    table12_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table12_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id=\'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a></td><td class="type3">                ' + list[i].news.author + '</td><td class="type1">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_zhipai ' + (common.role.val15 ? '' : 'hide') + '\'>' + (main.data.isAsign == 0 ? '指派' : '变更') + '</a><a href="javascript:void(0)" class=\'t_shenhe ' + (((!list[i].news.hopeUser||list[i].news.hopeUser.uid != $('.val3').text())&&list[i].news.publishUid == $('.val3').text() )? 'hide' : '')  + ' ' + (main.data.isAsign == 1 ? 'hide' : '') + '\'>\u5ba1\u6838</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a><a href="javascript:void(0)" class=\'t_bidui\'>\u6BD4\u5BF9</a></td><td class=\'' + (main.data.isAsign == 0 ? 'hide' : '') + '\'>' + list[i].asignName + '</td></tr>';
        }
        $('.table12 tbody').html(html1);
    },
    //列表显示
    table3_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table3_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var html2 = '';
            var html5 = '';
            var person = list[i].newsReviews;
            for (var j = 0; j < person.length; j++) {
                if (person[j].stage > 0) {
                    html5 += '<span>\u3010' + (person[j].stage == 3 ? '签发' : person[j].stage == 2 ? '二审' : '一审') + '\u3011' + person[j].user.username + '</span><br>';
                }
            }

            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';
            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id = \'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a><span class="explain ' + (list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion ? '' : 'hide') + '"><img src="//liaowang.oss-cn-hangzhou.aliyuncs.com/src/img/alert_03.png" alt="explain"><span class="explain_box">' + (list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion) + '<span class="yellow_arrow"></span></span></span></td><td class="type3">                ' + list[i].news.author + '</td><td class="type4">            ' + html5 + '</td><td class="type4">            ' + html2 + '</td><td class="type6">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_zhipai ' + (main.data.table == 3 ? 'hide' : '') + ' ' + (common.role.val15 ? '' : 'hide') + '\' >' + (main.data.isAsign == 0 ? '指派' : '变更') + ' </a><a href="javascript:void(0)" class=\'t_shenhe ' + (list[i].news.publishUid == $('.val3').text() ? 'hide' : '') + ' ' + (main.data.isAsign == 1 ? 'hide' : '') + '  \'>\u5ba1\u6838</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a><a href="javascript:void(0)"  class=\'t_bidui\'>\u6BD4\u5BF9</a></td><td class=\'' + (main.data.isAsign == 0 ? 'hide' : '') + '\'>' + list[i].asignName + '</td></tr>';
        }
        $('.table3 tbody').html(html1);
    },
    //列表显示
    table3z_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.table3_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var html2 = '';
            var html5 = '';
            var person = list[i].newsReviews;
            for (var j = 0; j < person.length; j++) {
                if (person[j].stage > 0) {
                    html5 += '<span>\u3010' + (person[j].stage == 3 ? '三' : person[j].stage == 2 ? '二' : '一') + '\u5ba1\u3011' + person[j].user.username + '</span><br>';
                }
            }

            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';
            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id = \'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a><span class="explain ' + (list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion ? '' : 'hide') + '"><img src="//liaowang.oss-cn-hangzhou.aliyuncs.com/src/img/alert_03.png" alt="explain"><span class="explain_box">' + (list[i].newsReviews[0] && list[i].newsReviews[0].editOpinion) + '<span class="yellow_arrow"></span></span></span></td><td class="type3">                ' + list[i].news.author + '</td><td class="type4">            ' + html5 + '</td><td class="type4">            ' + html2 + '</td><td class="type6">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_zhonshen\'>\u7EC8\u5ba1</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a><a href="javascript:void(0)"  class=\'t_bidui\'>\u6BD4\u5BF9</a></td></tr>';
        }
        $('.table3 tbody').html(html1);
    },
    //列表显示
    tablemy_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.tablemy_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var html2 = '';
            var html3 = '';
            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';
            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }

            switch (list[i].news.status) {
                case 0:
                    html3 = "待审核";
                    break;
                case 1:
                    html3 = '一审通过';
                    break;
                case 2:
                    html3 = '二审通过';
                    break;
                case 3:
                    html3 = '待终审';
                    break;
                case 4:
                    html3 = '已签发';
                    break;
                case 5:
                    html3 = '已采用';
                    break;
                case -1:
                    html3 = '草稿';
                    break;
                case -2:
                    html3 = '已删除';
                    break;
                default:
                    html3 = "未知状态";
                    break;
            }
            if (list[i].news.reviewStatus == 0) {
                html3 += '(退回)';
            }
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id = \'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a></td><td class="type3">                ' + list[i].news.author + '</td><td class="type3">                ' + html3 + '</td><td class="type4">                ' + html2 + '</td><td class="type1">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'' + (list[i].news.status == 3 ? 't_zhonshen' : 't_shenhe') + '\'>' + (list[i].news.status == 3 ? '终审' : '审核') + '</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a><a href="javascript:void(0)" class=\'t_bidui\'>\u6BD4\u5BF9</a></td></tr>';
        }
        $('.tablemy tbody').html(html1);
    },
    //列表显示
    tableself_show: function(res) {
        common.skip(main.skip_jump, main.data.ajax1, res, main.tableself_show);
        var list = res.context.list;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var html2 = '';
            var html3 = '';
            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : '';
            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }

            switch (list[i].news.status) {
                case 0:
                    html3 = "待审核";
                    break;
                case 1:
                    html3 = '一审通过';
                    break;
                case 2:
                    html3 = '二审通过';
                    break;
                case 3:
                    html3 = '待终审';
                    break;
                case 4:
                    html3 = '已签发';
                    break;
                case 5:
                    html3 = '已采用';
                    break;
                case -1:
                    html3 = '草稿';
                    break;
                case -2:
                    html3 = '已删除';
                    break;
                default:
                    html3 = "未知状态";
                    break;
            }
            if (list[i].news.reviewStatus == 0) {
                html3 += '(退回)';
            }
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id = \'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a></td><td class="type3">                ' + list[i].news.author + '</td><td class="type3">                ' + html3 + '</td><td class="type4">               ' + html2 + '</td><td class="type1">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_shenhe hide\'>\u5ba1\u6838</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a><a href="javascript:void(0)" class=\'t_bidui\'>\u6BD4\u5BF9</a></td></tr>';
        }
        $('.tableself tbody').html(html1);
    },
    //选择待审核/在审核
    click_audit2: function($this) {
        $('.audit_th1').addClass('hide');
        $('.audit2 li').removeClass('active');
        $this.addClass('active');
        if ($this.hasClass('switch1')) {
            main.data.isAsign = 0;
            main.data.ajax1.uid = common.k;
            main.data.ajax1.isAsign = main.data.isAsign;
            if (main.data.table == 1) {
                ajax_cms.getReviewNews(main.data.ajax1, main.table12_show);
            } else if (main.data.table == 2) {
                ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
            }
        } else if ($this.hasClass('switch2')) {
            $('.audit_th1').removeClass('hide');
            main.data.isAsign = 1;
            main.data.ajax1.uid = common.k;
            main.data.ajax1.isAsign = main.data.isAsign;
            if (main.data.table == 1) {
                ajax_cms.getReviewNews(main.data.ajax1, main.table12_show);
            } else if (main.data.table == 2) {
                ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
            }
        }
    },
    //选择不同列表
    click_li: function($this) {
        $('.contain_b .m_table').addClass('hide');
        $('.audit_th1').addClass('hide');
        $('#switch li').removeClass('active');
        $this.addClass('active');
        if ($this.hasClass('switch1')) {
            $('.audit2 li').removeClass('active');
            $('.audit2 .switch1').addClass('active');
            main.data.isAsign = 0;
            $('.audit2').show();
            main.data.table = 1;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: 0,
                isAsign: undefined,
                type: undefined,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            main.data.ajax1.isAsign = main.data.isAsign;
            ajax_cms.getReviewNews(main.data.ajax1, main.table12_show);
            $('.table12').removeClass('hide');
        } else if ($this.hasClass('switch2')) {
            $('.audit2 li').removeClass('active');
            $('.audit2 .switch1').addClass('active');
            main.data.isAsign = 0;
            $('.audit2').show();
            main.data.table = 2;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: 1,
                isAsign: undefined,
                type: undefined,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            main.data.ajax1.isAsign = main.data.isAsign;
            ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
            $('.table3').removeClass('hide');
        } else if ($this.hasClass('switch3')) {
            $('.audit2').hide();
            main.data.table = 3;
            main.data.isAsign = 0;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: 2,
                isAsign: 0,
                type: undefined,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
            $('.table3').removeClass('hide');
        } else if ($this.hasClass('switch6')) {
            $('.audit2').hide();
            main.data.table = 6;
            main.data.isAsign = 0;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: 3,
                isAsign: 0,
                type: undefined,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            ajax_cms.getReviewNews(main.data.ajax1, main.table3z_show);
            $('.table3').removeClass('hide');
        } else if ($this.hasClass('switch4')) {
            $('.audit2').hide();
            main.data.table = 4;
            main.data.isAsign = 0;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: undefined,
                isAsign: 0,
                type: 0,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            ajax_cms.getReviewNews(main.data.ajax1, main.tablemy_show);
            $('.tablemy').removeClass('hide');
        } else if ($this.hasClass('switch5')) {
            $('.audit2').hide();
            main.data.table = 5;
            main.data.isAsign = 0;
            main.data.ajax1 = {
                context: undefined,
                publishUid: undefined,
                field: undefined,
                stage: undefined,
                isAsign: 0,
                type: 1,
                start: 0,
                size: 20,
                storeType: 2
            };
            main.data.ajax1.uid = common.k;
            ajax_cms.getReviewNews(main.data.ajax1, main.tableself_show);
            $('.tableself').removeClass('hide');
        } else {
            layer.msg('表单数据错误');
        }
    },
    //选择指派
    click_zhipai: function($this) {
        main.data.ajax3.uid = common.k;
        var v1 = '';
        if (main.data.table == 1) {
            v1 = 'CMS014';
        } else if (main.data.table == 2) {
            v1 = 'CMS015';
        } else if (main.data.table == 3) {
            //v1 = 'CMS016';
        } else {
            layer.msg('指派非法!');
            return;
        }
        main.data.ajax3.roleId = encodeURI(v1);
        ajax_cms.getUsers(main.data.ajax3, main.pop_select_show);
        $('body>.pop').removeClass('hide');
        var $tr = $this.closest('tr');
        main.tr = $tr;
        var id = $tr.attr('tr_id');
        var stage = main.data.ajax1.stage;
        main.data.ajax2 = {
            newsId: id,
            asignUid: undefined,
            stage: stage
        };
        main.data.ajax2.uid = common.k;
    },
    //确定指派
    send_audit: function() {
        var arr1 = $('.pop select').val().split(':');

        main.data.ajax2.asignUid = arr1[0];
        main.data.ajax2.stage = main.data.table;
        main.data.ajax2.roleId = arr1[1];
        ajax_cms.asignNews(main.data.ajax2, main.send_audit_show);
        main.tr.hide();
    },
    send_audit_show: function send_audit_show(data) {
        if (data.code == 1) {
            layer.alert('指派成功', { icon: 1 });
        }
    },

    //搜索栏控制
    choice: function() {
        var k1 = $('#s_input')[0].value || undefined;
        var k2 = $('#s_author')[0].value || undefined;
        var k3 = $('#s_field')[0].value || undefined;
        k2 = k2 == '0' ? undefined : k2;
        k3 = k3 == '0' ? undefined : k3;
        main.data.ajax1.context = k1;
        main.data.ajax1.publishUid = k2;
        main.data.ajax1.field = k3;
        main.data.ajax1.start = 0;
        main.data.ajax1.size = 20;
        if (main.data.table == 1) {
            ajax_cms.getReviewNews(main.data.ajax1, main.table12_show);
        } else if (main.data.table == 2) {
            ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
        } else if (main.data.table == 3) {
            ajax_cms.getReviewNews(main.data.ajax1, main.table3_show);
        } else if (main.data.table == 6) {
            ajax_cms.getReviewNews(main.data.ajax1, main.table3z_show);
        } else if (main.data.table == 4) {
            ajax_cms.getReviewNews(main.data.ajax1, main.tablemy_show);
        } else if (main.data.table == 5) {
            ajax_cms.getReviewNews(main.data.ajax1, main.tableself_show);
        } else {
            layer.msg('表单选择数据错误!');
        }
    },
    //分页器跳转
    skip_jump: function(data, fun) {
        ajax_cms.getReviewNews(data, fun);
    }
};

main.start();

$('#switch').on('click', 'li', function() {
    main.click_li($(this));
});
$('.audit2').on('click', 'li', function() {
    main.click_audit2($(this));
});
$('table').on('click', '.t_zhipai', function() {
    main.click_zhipai($(this));
});
$('.pop button.bg_blue').on('click', function() {
    main.send_audit();
    $('body>.pop').addClass('hide');
});
$('.pop button.bg_gray').on('click', function() {
    $('body>.pop').addClass('hide');
});
$('#s_search').on('click', function() {
    main.choice();
});