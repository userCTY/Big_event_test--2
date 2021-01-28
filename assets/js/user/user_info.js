$(function(){
    //功能1 校验用户名合法性
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '用户昵称最长不能超过6个字符'
            }
        }
    })
    //功能1 实现获取用户数据并渲染
    getThis()

    //功能3 实现用户修改数据的提交
    $('#form_info').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('更新信息失败!')
                }
                layer.msg('更新信息成功!')
                getThis()
                window.parent.getUser()
            }
        })
    })

    //功能4 实现重置按钮效果
    $('#btn_reset').on('click',function(e){
        e.preventDefault()
        getThis()
    })
})
let form = layui.form
let layer = layui.layer
function getThis(){
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return layer.msg('获取用户信息失败!')
            }
            form.val('form_info',res.data)
        }
    })
}