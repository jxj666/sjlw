'use strict';

var main = {
    name: 'wait_news',






    data: {
        search: true,
        tableClear: true,
        table: 1,
        //部门判断
        section: 0,
        //新闻 id
        news_id: 0,
        //财经国家判断
        cjgjzk: 0,
        lwzk: 0,
        type: 0,
        //渠道
        channel: [],
        //财经国家渠道
        channel_1: [],
        //瞭望智库渠道
        channel_2: [],
        //渠道数
        channel_num: 1,
        //财经国家/瞭望切换
        channel_select: 1,
        //渠道 jq
        $channel: '',
        //模拟渠道section[]
        channel_key: $('.val1').text(),
        //临时存取数组
        arrary_1: [],
        arrary_2: [],
        arrary_3: [],
        //临时存放对象
        object_1: {},
        object_2: {},
        //临时存放字符
        string_1: '',
        //单位提示
        placeholder: '',

        ajax1: {
            name: 'getNewsList',
            context: undefined,
            field: undefined,
            channel: undefined,
            storeType: 1, //（稿库类型 1:普通库,2:研报库）
            newsStatus: 4,
            start: 0,
            size: 20
        },
        ajax2: {
            name: 'updateNews',
            channel: undefined,
            status: undefined,
            id: undefined,
            totalRead: undefined,
            periodical: undefined
        },
        ajax3: {
            name: 'updateNews',
            id: undefined,
            // （稿件ID）
            status: undefined,
            // （0：未发刊，1:已发刊）
            channel: undefined,
            // （格式：[{channelId,newsType,priceType,periodical,quantity,price},{channelId,newsType,priceType,periodical,quantity,price},]）
            wordNumber: undefined,
            // （字数）
            hasChannel: undefined,
            // （0:没有渠道 1:有渠道）
            sourceId: undefined,
            // (1:自采 2:约稿)
            price: undefined,
            // (单价)
            priceType: undefined,
            // （1:字数 2:版面 3:篇 4:条）
            column: undefined,
            //（栏目中文）
            layoutPrice: undefined,
            //（版面奖）
            newsType: undefined,
            //（稿件细分Id）
            position: undefined
            //（岗位中文）
        },
        ajax4: {
            name: 'getSubdivide',
            channelId: undefined
        },
        ajax5: {
            name: 'getChannel',
            did: $('.val1').text(),
            storeType: 1
        },
        ajax6: {
            name: 'info',
            newsId: undefined
        }
    },




    //启动
    start: function start() {
        common.val_reset();
        common.height_reset();
        common.clearfloat();
        common.getTrumpet();
        common.getPullDownList();
        common.bind_element();
        common.user_show();
        common.new_role_control();
        main.data.ajax1.uid = common.k;
        main.data.ajax2.uid = common.k;
        $('.left-list .item3').addClass('active');
        $('#switch .switch1').addClass('active');
        $('.nav_list .news').addClass('active');
        ajax_news.getNewsList(main.data.ajax1, main.tableno_show);
    },
    //列表展示
    tableno_show: function tableno_show(data) {
        common.skip(main.skip_jump, main.data.ajax1, data, main.tableno_show);
        var list = data.context.list;
        var html1 = ' ';
        for (var i = 0; i < list.length; i++) {
            var html2 = ' ';
            var html4 = ' ';
            var html3 = ' ';
            var html5 = ' ';
            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : [];
            var channel2 = list[i].news.channel ? list[i].news.channel.split(',') : [];
            var person = list[i].newsReviews;
            var arr1 = [];
            for (var j = 0; j < person.length; j++) {
                if (person[j].stage > 0) {
                    var boolean1 = false;
                    for (var k = 0; k < arr1.length; k++) {
                        if (person[j].stage == arr1[k]) {
                            boolean1 = true;
                        }
                    }
                    if (boolean1) {
                        continue;
                    }
                    arr1.push(person[j].stage);
                    html5 += '<span>\u3010' + (person[j].stage == 3 ? '签发' : person[j].stage == 2 ? '二审' : person[j].stage == 1 ? '一审' : '终审') + '\u3011' + person[j].user.username + '</span><br>';
                }
            }

            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }
            for (var j = 0; j < channel2.length; j++) {
                if (channel2[j]) {
                    html4 += '<span>\u3010' + channel2[j] + '\u3011</span>';
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
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_id = \'' + list[i].news.id + '\'><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a></td><td class="type3">                ' + list[i].news.author + '</td><td class="type4">             ' + html5 + '</td><td class="type4">                ' + html2 + '</td><td class="type3">                ' + html3 + '</td><td class="type6">               ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_daochu ' + (common.role.val5 ? '' : 'hide') + '\'>\u5BFC\u51FA</a><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a> <a href="javascript:void(0)" class=\'t_chakan\'>\u67e5\u770b</a> <a href="javascript:void(0)" class=\'t_bidui\'>\u6BD4\u5BF9</a></td><td class="type5"><a href="javascript:void(0)" class=\'t_biangen ' + (common.role.val7 ? '' : 'hide') + '\'>\u53D8\u66F4</a></td></tr>';
        }
        $('.tableno tbody').html(html1);
    },
    //列表展示
    tableyes_show: function tableyes_show(data) {
        common.skip(main.skip_jump, main.data.ajax1, data, main.tableyes_show);
        var list = data.context.list;

        var html1 = ' ';

        for (var i = 0; i < list.length; i++) {
            var html2 = ' ';
            var html4 = ' ';
            var html3 = ' ';
            var html5 = ' ';
            var channel = list[i].news.moniChannel ? list[i].news.moniChannel.split(',') : [];
            var channel2 = list[i].news.channel ? list[i].news.channel.split(',') : [];
            var person = list[i].newsReviews;
            var arr1 = [];
            for (var j = 0; j < person.length; j++) {
                if (person[j].stage > 0) {
                    var boolean1 = false;
                    for (var k = 0; k < arr1.length; k++) {
                        if (person[j].stage == arr1[k]) {
                            boolean1 = true;
                        }
                    }
                    if (boolean1) {
                        continue;
                    }
                    arr1.push(person[j].stage);
                    html5 += '<span>\u3010' + (person[j].stage == 3 ? '三' : person[j].stage == 2 ? '二' : '一') + '\u5ba1\u3011' + person[j].user.username + '</span><br>';
                }
            }

            for (var j = 0; j < channel.length; j++) {
                if (channel[j]) {
                    html2 += '<span>\u3010' + channel[j] + '\u3011</span>';
                }
            }
            for (var j = 0; j < channel2.length; j++) {
                if (channel2[j]) {
                    html4 += '<span>\u3010' + channel2[j] + '\u3011</span>';
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
            html1 += '<tr class="' + (i % 2 == 0 ? 'bg_white' : 'bg_gray') + '" tr_status=\'1\' tr_id=\'' + list[i].news.id + '\' ><td class="type1">                ' + list[i].news.id + '</td><td class="type2"><span>\u3010' + list[i].news.field + '\u3011</span><a href="javascript:void(0)">' + list[i].news.title + '</a></td><td class="type3">            ' + list[i].news.author + '</td><td class="type4">              ' + html5 + '</td><td class="type4">            ' + html2 + '</td><td class="type4">                 ' + html4 + '</td><td class="type3">                ' + html3 + '</td><td class="type1">                ' + list[i].news.totalRead + '</td><td class="type6">                ' + list[i].news.createTime + '</td><td class="type5"><a href="javascript:void(0)" class=\'t_yulan\'>\u9884\u89c8</a> <a href="javascript:void(0)" class=\'t_chakan\'>\u67e5\u770b</a> <a href="javascript:void(0)" class=\'t_daochu ' + (common.role.val5 ? '' : 'hide') + '\'>\u5BFC\u51FA</a><a href="javascript:void(0)" class=\'t_bidui\'>\u6BD4\u5BF9</a></td><td class="type1">                ' + (list[i].news.periodical || '未记录') + '</td><td class="type5" test=\'1\'><a href="javascript:void(0)" class=\'t_biangen ' + (common.role.val7 ? '' : 'hide') + '\'>\u53D8\u66F4</a></td></tr>';
        }
        $('.tableyes tbody').html(html1);
    },










    //变更稿件状态
    click_change: function click_change($this) {
        var key = main.data.channel_key;
        var $tr = $this.closest('tr');
        var news_id = $tr.attr('tr_id');
        main.data.news_id = news_id;
        main.data.ajax5.did = key;
        main.data.channel = [];
        ajax_news.getChannel(main.data.ajax5, main.data_channel);
        main.data.ajax6.uid = common.k;
        main.data.ajax6.newsId = news_id;
        ajax_news.info(main.data.ajax6, main.text_length);
    },
    //计算字数
    text_length: function text_length(res) {
        var html1 = res.context.news.content.replace(/<.*?>/g, '');
        main.data.ajax3.wordNumber = html1.length;
    },










    //渠道信息
    data_channel: function data_channel(res) {
        var key = main.data.channel_key;
        main.data.channel_1 = res.context;
        main.data.channel = main.data.channel.concat(res.context);
        if (main.data.ajax1.storeType == 2) {
            key = 'YB';
        }
        $('.pop_base .change2').hide();
        $('.pop_base .change3').hide();
        $('.pop_base .change4').hide();
        $('.pop_base .change5').hide();
        switch (key) {
            case 'CJGJZK':
                main.data.type = 1;
                main.data.cjgjzk = 1;
                main.pop_CJGJ();
                break;
            case 'LWZK':
                main.data.type = 1;
                main.data.lwzk = 1;
                main.pop_CJGJ();
                break;
            case 'DFZK':
                main.data.type = 2;
                main.pop_DFZK();
                break;
            case 'HQZZ':
                main.data.type = 3;
                main.pop_HQZZ();
                break;
            case 'ZKS':
                main.data.type = 4;
                main.pop_ZKS();
                break;
            case 'YB':
                main.data.type = 5;
                main.pop_YB();
                break;
            default:
                layer.alert('部门资料错误!', { icon: 1 });
                return;
        }
        $('body>.pop').removeClass('hide');
    },
    //仅获取渠道信息
    data_channel2: function data_channel2(res) {
        // if (main.data.channel_select == 1) {
        //     main.data.channel_1 = res.context;
        // } else {
        //     main.data.channel_2 = res.context;
        // }
        // var key = main.data.channel_key;
        main.data.channel = main.data.channel.concat(res.context);
        main.add_channel();
        if (main.data.cjgjzk == 1) {
            $('.channel .channel_i option').each(function() {
                if (this.value <= 4) {
                    $(this).hide();
                }
            });
            $('.pop .check1').addClass('act');
        } else {
            $('.channel .channel_i option').each(function() {
                if (this.value >= 5) {
                    $(this).hide();
                }
            });
            $('.pop .check2').addClass('act');
        }
    },








    //财经国家
    //财经国家数据
    data_CJGJ: function data_CJGJ() {
        main.data_common();
    },
    //有渠道通用数据
    data_common: function data_common() {
        var channel_list = $('.change3 .channel');
        var arr1 = [];
        channel_list.each(function(i) {
            var obj = {
                channelId: parseInt($(this).find('.measure2_i input').attr('key1')) || undefined,
                newsType: parseInt($(this).find('.measure2_i input').attr('key2')) || undefined,
                priceType: parseInt($(this).find('.measure2_i input').attr('key3')) || undefined,
                factor: $(this).find('.measure2_i input').attr('key4') || '1',
                periodical: parseInt($(this).find('.num_i input').val()) || undefined,
                quantity: parseInt($(this).find('.page_i input').val()) || 1,
                price: $(this).find('.measure2_i input').val() || undefined
            };
            arr1.push(obj);
        });
        main.data.ajax3.id = parseInt(main.data.news_id);
        main.data.ajax3.status = $('.change1 .status_i').val();
        main.data.ajax3.channel = JSON.stringify(arr1);;
        main.data.ajax3.hasChannel = 1;
        //console.log(main.data.ajax3);
    },

    // 财经国家弹框
    pop_CJGJ: function pop_CJGJ() {
        $('.pop_base .change2').show();
        $('.pop_base .change3').show();
        main.data.section = 1;
        $('.change3 .channel').remove();
        main.data.channel_num = 1;
        if (main.data.cjgjzk == 1) {
            main.data.ajax5.did = 'LWZK';
        } else {
            main.data.ajax5.did = 'CJGJZK';
        }
        ajax_news.getChannel(main.data.ajax5, main.data_channel2);
    },








    //研报
    //数据
    data_YB: function data_YB() {
        main.data.ajax3.id = parseInt(main.data.news_id);
        main.data.ajax3.status = $('.change1 .status_i').val();
        main.data.ajax3.hasChannel = 0;
        main.data.ajax3.price = $('.change4 .unit2_i input').val();
        main.data.ajax3.factor = 1;
        //console.log(main.data.ajax3);
    },
    //弹框
    pop_YB: function pop_YB() {
        $('.pop_base .change4').show();
        $('.pop_base .change4 .class2_i').addClass('v_hide');
        main.data.section = 2;
        var html1 = '<option value="">\u8BF7\u9009\u62E9</option>';
        var arr1 = money_data.yb;
        for (var i = 0; i < arr1.length; i++) {
            html1 += '<option value="' + i + '">' + arr1[i].name + '</option>';
        }
        $('.change4 .type_i select').html(html1);
    },








    //东方周刊
    //数据
    data_DFZK: function data_DFZK() {
        main.data_common();
    },
    //弹框
    pop_DFZK: function pop_DFZK() {
        $('.pop_base .change3').show();
        main.data.section = 3;
        $('.change3 .channel').remove();
        main.data.channel_num = 1;
        main.add_channel();
    },




    //环球杂志
    //数据
    data_HQZZ: function data_HQZZ() {
        main.data_common();
    },
    //弹框
    pop_HQZZ: function pop_HQZZ() {
        $('.pop_base .change3').show();
        main.data.section = 4;
        $('.change3 .channel').remove();
        main.data.channel_num = 1;
        main.add_channel();
    },








    //周刊社
    //数据
    data_ZKS: function data_ZKS() {
        main.data.ajax3.id = parseInt(main.data.news_id);
        main.data.ajax3.status = $('.change1 .status_i').val();
        main.data.ajax3.hasChannel = 0;
        main.data.ajax3.price = $('.change5 .unit2_i input').val();
        main.data.ajax3.layoutPrice = $('.change5 .page2_i input').val();
        main.data.ajax3.priceType = money_data.zks_comon.priceType;
        //console.log(main.data.ajax3);
    },
    //弹框
    pop_ZKS: function pop_ZKS() {
        $('.pop_base .change5').show();
        main.data.section = 5;
        var html1 = '<option value="">\u8BF7\u9009\u62E9</option>';
        var arr1 = money_data.zks;
        main.data.arrary_1 = arr1;
        for (var i = 0; i < arr1.length; i++) {
            html1 += '<option value="' + i + '">' + arr1[i].name + '</option>';
        }
        $('.change5 .column_i select').html(html1);
    },












    //增加渠道
    add_channel: function add_channel() {
        var html1 = '<option value="0">请选择</option>';
        var arr1 = main.data.channel;

        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].id >= 15) {
                continue;
            }
            html1 += '<option value=\'' + arr1[i].id + '\'>' + arr1[i].name + '</option>';
        }
        var html2 = '                <div class="channel">\n                    <div class="channel_h">\u6E20\u9053 ' + main.data.channel_num++ + '<span class="close">\xD7</span></div>\n                    <div class="channel_b">\n                        <div class="channel_l channel_i">\n                            <div class="list_l">\u6E20\u9053\u9009\u62E9 : </div>\n                            <div class="list_r">\n                                <select>\n                                    ' + html1 + '\n                                </select>\n                            </div>\n                        </div>\n                        <div class="channel_l money_i">\n                            <div class="list_l">\u7A3F\u8D39\u7EC6\u5206 : </div>\n                            <div class="list_r">\n                                <select>\n                                    <option></option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class="channel_l measure_i">\n                            <div class="list_l">\u5355\u4F4D\u7A3F\u8D39 : </div>\n                            <div class="list_r">\n                                <select >\n                                    <option></option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class="channel_l measure2_i v_hide">\n                            <div class="placeholder">\u5355\u4F4D</div><input type="" name="">\n                        </div>\n                        <div class="channel_l page_i hide">\n                            <div class="list_l">\u7248\u9762/\u6761 : </div>\n                            <div class="list_r">\n                                <div class="placeholder" style="right: 10%;">\u7248\u6216\u6761</div><input type="" name="" >\n                            </div>\n                        </div>\n                        <div class="channel_l num_i hide">\n                            <div class="list_l">\u671F\u520A\u53F7 : </div>\n                            <div class="list_r">\n                                <div class="placeholder" style="right: 10%;">\u671F</div><input type="" name="">\n                            </div>\n                        </div>\n                        <div class="clear"></div>\n                    </div>\n                </div>';
        $('.change3 .checks').before(html2);
        if (main.data.cjgjzk == 1) {
            $('.channel .channel_i option').each(function() {
                if (this.value < 5) {
                    $(this).hide();
                }
            });
        } else if (main.data.lwzk == 1) {
            $('.channel .channel_i option').each(function() {
                if (this.value >= 5) {
                    $(this).hide();
                }
            });
        } else {
            return;
        }
    },
    //减少渠道
    close_channel: function close_channel($this) {
        var $channel = $this.closest('.channel');
        $channel.remove();
    },













    // 渠道选择
    select_channel: function select_channel($this) {
        var val = $this.val();
        var $channel = $this.closest('.channel');
        $channel.find('.page_i').addClass('hide');
        $channel.find('.num_i').addClass('hide');
        $channel.find('.measure2_i input').attr('key1', val);
        main.data.$channel = $channel;
        //期刊
        if (val == 5 || val == 11) {
            $channel.find('.num_i').removeClass('hide');
        }
        //版面与期刊
        if (val == 8) {
            $channel.find('.page_i').removeClass('hide');
            $channel.find('.num_i').removeClass('hide');
        }
        //条
        if (val == 9 || val == 10) {
            $channel.find('.page_i').removeClass('hide');
        }
        $channel.find('.money_i select').html('<option value="0">待加载</option>');
        $channel.find('.measure_i select').html('<option value="0">待加载</option>');
        main.data.ajax4.channelId = val;
        ajax_news.getSubdivide(main.data.ajax4, main.select_money);
    },













    //稿费细分
    select_money: function select_money(res) {
        var list = res.context;
        var html1 = '';
        for (var i = 0; i < list.length; i++) {
            var k = list[i].dictSubdivide;
            html1 += '<option value=\'' + k.id + '\'>' + k.name + '</option>';
        }
        main.data.$channel.find('.money_i select').html(html1);
    },
    //展示 select
    select_show: function select_show(arr) {
        var html1 = '';
        for (var i = 0; i < arr.length; i++) {
            html1 += '<option value=\'' + i + '\'>' + arr[i].name + '</option>';
        }
        return html1;
    },
    //展示 select2
    select_show2: function select_show2(obj) {
        var html1 = '';
        html1 += '<option value=\'' + obj.money.split('元')[0] + '\'>' + obj.money + '</option>';
        html1 += '<option value="hand">手动输入</option>';
        $('.change4 .unit2_i input').val(obj.money.split('元')[0]);
        main.data.placeholder = '元' + obj.money.split('元')[1];
        main.data.string_1 = '元' + obj.money.split('元')[1];
        return html1;
    },
    //展示 select3
    select_show3: function select_show3() {
        var html1 = '<option value="1">在审人员</option><option value="1">外聘人员</option>';
        return html1;
    },
    //展示 select4
    select_show4: function select_show4(str) {
        var html1 = '';
        html1 += '<option value=\'' + str.split('元')[0] + '\'>' + str + '</option>';
        html1 += '<option value="hand">手动输入</option>';
        $('.change5 .unit2_i input').val(str.split('元')[0]);
        main.data.placeholder = '元' + str.split('元')[1];
        return html1;
    },
    //展示 select5
    select_show5: function select_show5(str) {
        var html1 = '';
        html1 += '<option value=\'' + str.split('元')[0] + '\'>' + str + '</option>';
        html1 += '<option value="0">无</option><option value="hand">手动输入</option>';
        $('.change5 .page2_i input').val(str.split('元')[0]);
        return html1;
    },






    //确认变更提交发送
    click_submit: function click_submit() {
        switch (main.data.section) {
            case 1:
                main.data_CJGJ();
                break;
            case 2:
                main.data_YB();
                break;
            case 3:
                main.data_DFZK();
                break;
            case 4:
                main.data_HQZZ();
                break;
            case 5:
                main.data_ZKS();
                break;
            default:
                layer.alert('获取部门信息初试数据失败!', { icon: 1 });
                $('body>.pop').addClass('hide');
                return;
        }
        // main.submit_change
        ajax_news.updateNews(main.data.ajax3, main.submit_change);
    },
    // 处理变更
    submit_change: function submit_change(res) {
        if (res.code == 1) {
            main.reset_html();
            $('.change2 .check').removeClass('act');
            $('body>.pop').addClass('hide');
            var jq1 = 'body tr[tr_id=\'' + main.data.ajax3.id + '\']';
            $(jq1).hide();
            main.data.cjgjzk = 0;
            main.data.lwzk = 0;
            main.data.ajax3 = {
                name: 'updateNews',
                id: undefined,

                status: undefined,

                channel: undefined,

                wordNumber: undefined,

                hasChannel: undefined,

                sourceId: undefined,

                price: undefined,

                priceType: undefined,

                column: undefined,

                layoutPrice: undefined,
                newsType: undefined,
                position: undefined

            };
        } else {
            alert('数据错误!请检查!');
        }
    },







    //列表切换
    click_li: function click_li($this) {
        common.getPullDownList();
        $('.contain_b .m_table').addClass('hide');
        $('#switch li').removeClass('active');
        $this.addClass('active');
        if ($this.hasClass('switch1')) {
            main.data.table = 1;
            main.data.ajax1.context = undefined;
            main.data.ajax1.field = undefined;
            main.data.ajax1.channel = undefined;
            main.data.ajax1.newsStatus = 4;
            main.data.ajax1.start = 0;
            main.data.ajax1.size = 20;
            main.data.ajax1.uid = common.k;
            ajax_news.getNewsList(main.data.ajax1, main.tableno_show);
            $('.tableno').removeClass('hide');
        } else {
            main.data.table = 2;

            main.data.ajax1.context = undefined;
            main.data.ajax1.field = undefined;
            main.data.ajax1.channel = undefined;
            main.data.ajax1.newsStatus = 5;
            main.data.ajax1.start = 0;
            main.data.ajax1.size = 20;

            main.data.ajax1.uid = common.k;
            ajax_news.getNewsList(main.data.ajax1, main.tableyes_show);
            $('.tableyes').removeClass('hide');
        }
    },
    //搜索栏控制
    choice: function choice() {
        var k1 = $('#s_input')[0].value || undefined;
        var k2 = $('#s_field')[0].value || undefined;
        var k3 = $('#s_channel')[0].value || undefined;
        k2 = k2 == '0' ? undefined : k2;
        k3 = k3 == '0' ? undefined : k3;
        main.data.ajax1.context = k1;
        main.data.ajax1.field = k2;
        main.data.ajax1.channel = k3;
        main.data.ajax1.start = 0;
        main.data.ajax1.size = 20;
        if (main.data.table == 1) {
            ajax_news.getNewsList(main.data.ajax1, main.tableno_show);
        } else {
            ajax_news.getNewsList(main.data.ajax1, main.tableyes_show);
        }
    },
    //分页器跳转
    skip_jump: function skip_jump(data, fun) {
        ajax_news.getNewsList(data, fun);
    },
    //研报普通切换
    switch_type: function switch_type($this) {
        $('.switch_wait2 li').removeClass('active');
        main.data.ajax5.did = $('.val1').text();
        $this.addClass('active');
        if ($this.hasClass('switch1')) {
            main.data.ajax1.storeType = 1;
            main.data.ajax5.storeType = 1;
            common.data.storeType = 1;
        } else {
            main.data.ajax1.storeType = 2;
            main.data.ajax5.storeType = 2;
            common.data.storeType = 2;
        }
        ajax_news.getChannel(main.data.ajax5, main.select_channel_show);
        if (main.data.table == 1) {
            ajax_news.getNewsList(main.data.ajax1, main.tableno_show);
        } else {
            ajax_news.getNewsList(main.data.ajax1, main.tableyes_show);
        }
    },







    //渠道选择变换
    select_channel_show: function(data) {
        common.s_channel = [];

        var list = data.context || [];


        function show_l(list, data, e, key, name) {

            if ($(e)) {
                for (var i = 0; i < list.length; i++) {
                    data.push({
                        id: list[i].id,
                        name: list[i].name,
                        username: list[i].username
                    })
                }
                var html1 = '<option value="0">\u6240\u6709' + name + '</option>';
                var html2 = '';
                for (var i = 0, l = data; i < l.length; i++) {
                    if (key == 3) {
                        html2 = l[i].username;
                    } else {
                        html2 = l[i].name;
                    }
                    html1 += '<option value="' + html2 + '">' + html2 + '</option>';
                }
                $(e).html(html1);
            }
        }
        show_l(list, common.s_channel, '#s_channel', 1, '渠道');

    },





    //弹框多部门切换
    check_click: function check_click($this) {
        $this.toggleClass('act');
        if ($this.hasClass('check1')) {
            if (main.data.cjgjzk == 1) {
                main.data.cjgjzk = 0;
                // main.data.channel_1 = [];
                // main.data.channel = main.data.channel_2;
                $('.channel .channel_i option').each(function() {
                    if (this.value >= 5) {
                        $(this).hide();
                    }
                });
            } else {
                main.data.channel_select = 1;
                main.data.cjgjzk = 1;
                // main.data.ajax5.did = 'CJGJZK';
                // ajax_news.getChannel(main.data.ajax5, main.data_channel2);
                $('.channel .channel_i option').each(function() {
                    if (this.value >= 5) {
                        $(this).show();
                    }
                });
            }
        } else {
            if (main.data.lwzk == 1) {
                main.data.lwzk = 0;
                // main.data.channel_2 = [];
                // main.data.channel = main.data.channel_1;
                $('.channel .channel_i option').each(function() {
                    if (this.value <= 4) {
                        $(this).hide();
                    }
                });
            } else {
                // main.data.channel_select = 2;
                main.data.lwzk = 1;
                // main.data.ajax5.did = 'LWZK';
                // ajax_news.getChannel(main.data.ajax5, main.data_channel2);
                $('.channel .channel_i option').each(function() {
                    if (this.value <= 4) {
                        $(this).show();
                    }
                });
            }
        }
    },






    //获取稿费
    select_to_money: function select_to_money($this) {
        var val = $this.val();
        var $channel = $this.closest('.channel');

        $channel.find('.measure2_i input').attr('key2', val);
        var key1 = $channel.find('.channel_i select').val();
        var key2 = $this.val();
        $channel.find('.measure_i select').html('<option value="0">待加载</option>');
        //console.log(key1, key2);
        if (main.data.type == 1) {
            main.show_money(money_data.cjgjzk_lwzk[key1][key2], $channel, money_data.cjgjzk_lwzk[key1]);
        } else if (main.data.type == 2) {
            main.show_money(money_data.dfzk[key1][key2], $channel, money_data.dfzk[key1]);
        } else if (main.data.type == 3) {
            main.show_money(money_data.hqzz[key1][key2], $channel, money_data.hqzz[key1]);
        } else {}
    },
    //显示稿费
    show_money: function show_money(money, $channel, type) {
        if (money) {
            var html1 = '';
            html1 += '<option value="' + money.split("元")[0] + '" >' + money + '</option>';
            html1 += '<option value="' + type.priceType + '">\u624B\u52A8\u8F93\u5165</option>';
            $channel.find('.measure_i select').html(html1);
            $channel.find('.measure2_i input').val(money.split("元")[0]);
            $channel.find('.measure2_i input').attr('key3', type.priceType);
            if (main.data.section == 4) {
                $channel.find('.measure2_i input').attr('key4', money.split("元")[2]);
            }
        } else {
            alert('金额参数缺失!,请仔细核对,防止结算错误!');
        }
    },









    //选择金额
    select_measure: function select_measure($this) {
        var $channel = $this.closest('.channel');
        $channel.find('.measure2_i').addClass('v_hide');
        var key1 = $this.val();
        var key2 = '';
        //console.log($channel.find('.measure2_i input').attr('key1'), $channel.find('.measure2_i input').attr('key2'), $channel.find('.measure2_i input').attr('key3'));
        if (key1 == 'no') {
            $channel.find('.measure2_i input').val(0);
        } else if (key1 < 5) {
            $channel.find('.measure2_i').removeClass('v_hide');
            $channel.find('.measure2_i input').val(0);
            key1 == 1 ? key2 = '元/千字' : key1 == 2 ? key2 = '元/版面' : key1 == 3 ? key2 = '元/篇' : key1 == 4 ? key2 = '元/条' : key2 = '未定义单位!';
            $channel.find('.measure2_i .placeholder ').text(key2);
        } else {
            $channel.find('.measure2_i input').val(key1);
        }
    },






    //选择稿件类型
    select_type: function select_type($this) {
        var key1 = $this.val();
        if (main.data.section == 2) {

            main.data.arrary_1 = money_data.yb;
            main.data.arrary_2 = money_data.yb[key1].data;
            main.data.ajax3.sourceId = main.data.arrary_1[key1].type;
            var arr1 = money_data.yb[key1].data;
            var html1 = main.select_show(arr1);
            $('.change4 .job_i select').html(html1);
        } else {}
    },




    //选择职位
    select_job: function select_job($this) {
        var key1 = $this.val();
        if (main.data.section == 2) {
            main.data.ajax3.priceType = main.data.arrary_2[key1].priceType;
            main.data.ajax3.position = main.data.arrary_2[key1].name;
            main.data.arrary_3 = main.data.arrary_2[key1].data;
            var arr1 = main.data.arrary_2[key1].data;
            var html1 = main.select_show(arr1);
            $('.change4 .class_i select').html(html1);
        } else {}
    },



    // 选择细分
    select_class: function select_class($this) {
        var key1 = $this.val();
        if (main.data.section == 2) {
            main.data.ajax3.newsType = main.data.arrary_3[key1].type;
            var obj1 = main.data.arrary_3[key1];
            var html1 = main.select_show2(obj1);
            $('.change4 .unit_i select').html(html1);
            $('.change4 .unit_i .placeholder').text(main.data.string_1);
        } else {}
    },





    //选择计价
    select_unit: function select_unit($this) {
        var key1 = $this.val();
        $('.change4 .unit2_i').addClass('v_hide');
        $('.change5 .unit2_i').addClass('v_hide');
        if (main.data.section == 2) {
            if (key1 == 'hand') {
                $('.change4 .unit2_i').removeClass('v_hide');
                $('.change4 .unit2_i input').val(0);
                $('.change4 .unit2_i .placeholder ').text(main.data.placeholder);
            } else if (key1 == '0') {
                $('.change4 .unit2_i input').val(0);
            } else {
                var key2 = $this.closest('.change4').find('.unit_i select').val();
                $('.change4 .unit2_i input').val(key2);
            }
        } else if (main.data.section == 5) {
            if (key1 == 'hand') {
                $('.change5 .unit2_i').removeClass('v_hide');
                $('.change5 .unit2_i input').val(0);
                $('.change5 .unit2_i .placeholder').text(main.data.placeholder);
            } else if (key1 == '0') {
                $('.change5 .unit2_i input').val(0);
            } else {
                var key2 = $this.closest('.change5').find('.unit_i select').val();
                $('.change5 .unit2_i input').val(key2);
            }
        } else {}
    },





    // 选择版面奖
    select_page: function select_page($this) {
        var key1 = $this.val();
        $('.change5 .page2_i').addClass('v_hide');
        if (main.data.section == 5) {
            if (key1 == 'hand') {
                $('.change5 .page2_i').removeClass('v_hide');
                $('.change5 .page2_i input').val(0);
                $('.change5 .page2_i .placeholder').text(main.data.placeholder);
            } else if (key1 == '0') {
                $('.change5 .page2_i input').val(0);
            } else {
                var key2 = $this.closest('.change5').find('.page_i select').val();
                $('.change5 .page2_i input').val(key2);
            }
        } else {}
    },




    // 选择栏目
    select_column: function select_column($this) {
        var key1 = $this.val();
        if (main.data.section == 5) {
            var obj1 = main.data.arrary_1[key1];
            main.data.object_1 = obj1;
            var html1 = main.select_show3();
            main.data.ajax3.column = main.data.arrary_1[key1].name;
            $('.change5 .person_i select').html(html1);
        } else {}
    },




    //选择人员类型
    select_person: function select_person($this) {
        var key1 = $this.val();
        if (main.data.section == 5) {
            var str1 = main.data.object_1[key1];
            var str2 = money_data.zks_comon.award;
            var html1 = main.select_show4(str1);
            var html2 = main.select_show5(str2);

            $('.change5 .unit_i select').html(html1);
            $('.change5 .page_i select').html(html2);
        } else {}
    },







    //退出刷新
    click_quit: function click_quit() {
        main.reset_html();

        main.data.ajax3 = {
            name: 'updateNews',
            id: undefined,

            status: undefined,

            channel: undefined,

            wordNumber: undefined,

            hasChannel: undefined,

            sourceId: undefined,

            price: undefined,

            priceType: undefined,

            column: undefined,

            layoutPrice: undefined,

            newsType: undefined,

            position: undefined

        };
    },
    //重置弹框
    reset_html: function reset_html() {
        main.data.cjgjzk = 0;
        main.data.lwzk = 0;
        $('.change2 .check').removeClass('act');
        $('.pop input').val(0);
        $('.pop select').val(0);
        //console.log($('.pop intput'));
        $('.pop input').each(function(i) {
            $(this).closest('.money_l').addClass('v_hide');
        });
        $('.pop input').each(function(i) {
            $(this).closest('.channel_l').addClass('v_hide');
        });
    }
};

//绑定与运行
main.start();
$('table').on('click', '.t_biangen', function() {
    main.click_change($(this));
});
$('.pop .bg_blue').on('click', function() {
    main.click_submit();
});
$('.pop .bg_gray').on('click', function() {
    main.reset_html();
    main.click_quit();
    $('body>.pop').addClass('hide');
});
$('#switch').on('click', 'li', function() {
    main.click_li($(this));
});
$('#s_search').on('click', function() {
    main.choice();
});
$('.switch_wait2').on('click', 'li', function() {
    main.switch_type($(this));
});
$('.pop').on('click', '.change3 .add_channel', function() {
    main.add_channel();
});
$('.pop').on('click', '.change3 .close', function() {
    main.close_channel($(this));
});
$('.pop').on('change', '.change3 .channel_i select', function() {
    main.select_channel($(this));
});
$('.pop').on('change', '.change3 .money_i select', function() {
    main.select_to_money($(this));
});
$('.pop').on('change', '.change3 .measure_i select', function() {
    main.select_measure($(this));
});
$('.pop').on('change', '.change4 .type_i select', function() {
    main.select_type($(this));
});
$('.pop').on('change', '.change4 .job_i select', function() {
    main.select_job($(this));
});
$('.pop').on('change', '.change4 .class_i select', function() {
    main.select_class($(this));
});
$('.pop').on('change', '.change4 .unit_i select', function() {
    main.select_unit($(this));
});
$('.pop').on('change', '.change5 .unit_i select', function() {
    main.select_unit($(this));
});
$('.change2 .check').on('click', function() {
    main.check_click($(this));
});
$('.pop').on('change', '.change5 .column_i select', function() {
    main.select_column($(this));
});
$('.pop').on('change', '.change5 .page_i select', function() {
    main.select_page($(this));
});
$('.pop').on('change', '.change5 .person_i select', function() {
    main.select_person($(this));
});