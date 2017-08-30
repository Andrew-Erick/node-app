$(function(){
  var json=[{
    "id":1,
    "name":"概念开发阶段", 
    "stage_description":"针对前期识别的潜在商业机会，持续进行针对性的市场研究，确认潜在可行的并符合公司发展规划的产品和项目机会。本阶段确认的潜在项目机会经过决策部门批准后，可以正式开展项目的策划和准备工作。", 
    "output":"a) 市场分析与产品规划：b) 潜在商业机会报告；c) 概念开发阶段工作计划",
    "preview_in":1,
    "preview_out":2
  },{
    "id":2,
    "name":"立项论证阶段", 
    "stage_description":"针对前期确定的商业机会和潜在项目机会，进行立项论证工作，开展立项的准备工作，制定民机产品系统商业要求和目标。确认潜在项目符合潜在客户的要求以及公司战略发展规划。本阶段确认的潜在项目经过决策部门批准后，可以正式开展项目可行性论证方面的工作。", 
    "output":"a) 概念方案论证：民机产品系统商业要求和目标；用户需求分析报告；民机产品系统方案（一般是多个产品方案）；PBS。b) 关键技术：项目关键技术论证报告。c) 资源管理：条件保障建设方案。d) 项目管理：WBS；项目里程碑计划；项目立项建议书。e) 风险管理：项目风险分析与评估报告。",
    "preview_in":2,
    "preview_out":3
  },{
    "id":3,
    "name":"初步设计阶段", 
    "stage_description":"在可行性研究的基础上，开展民机产品系统的初步设计，结合潜在客户的要求对总体技术方案进行优化，形成飞机级的需求和方案。同时，根据项目合作模式，可联合潜在供应商开展联合概念定义工作", 
    "output":"a) 功能分析：飞机功能定义和架构；飞机功能接口控制文件（FICD）；系统功能定义文件。b) 需求分析：飞机级需求定义；GTS；系统顶层需求定义；系统级需求定义。c)需求确认：飞机需求确认总结报告；系统顶层需求确认总结报告。d) 设计综合：飞机设计描述文件；系统设计描述文件；飞机设计验证总结报告；PBS。e) 产品实施：制造总方案。f) 试验试飞：试飞总方案。g) 样机：展示样机。h) 结构强度：载荷基本分析报告；结构布局分析报告；飞机寿命分析报告；载荷计算报告；强度分析计算规范；结构技术方案。i) 人为因素：驾驶舱设计理念与要求；驾驶舱布局图；机组任务描述；驾驶舱人机界面功能分配说明。j) 四性：安全性通用数据文件；飞机功能危险性评估；飞机可靠性指标分配；飞机维修性指标分配；飞机测试性指标分配；初步飞机安全性评估。k) 合格审定：审定基础；设计保证手册；适航取证总方案。l) 客户服务：客户服务总方案；维修支持需求定义；飞行/运行支持需求定义；培训需求定义。m) 关键技术：项目关键技术评估报告。n) 市场营销与交付：用户选型目录。",
    "preview_in":5,
    "preview_out":6
  }]
  var $table=$('#stageTable');
  var $remove=$('#stageRemove');
  var $toolbar=$('#stageToolbar');
  var $add=$('#stageAdd');
  var $form=$('#stageForm');
  var $modal=$('#stageModal');
  window.previewFormatter=function(value,row,index){
     return value==undefined?"":("<a target='_blanket' href='/preview/detail?id="+value._id+"'>"+value.name+"</a>");
  };
  window.stageFormatter=function(value,row,index){
    return ['<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  window.stageActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      $form.attr({'data-add':'false','data-index':index});
       $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="preview_in"||name=="preview_out"){
          $(item).val(row[name]._id)
        }else{
          $(item).val(row[name]);
        }
      });
    },
    'click .remove': function (e, value, row, index) {
      e.preventDefault();
       deleteItem([row._id],function(){
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });     
      })
     }
  };
  $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

    // save your data, here just save the current page
    // selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });
  $remove.click(function(){
     var data=getIdSelections();
    if(data.ids.length>0){
      deleteItem(data.rowids,function(){
        $table.bootstrapTable('remove',{
          field:'_id',
          values:data.ids
        })
        $remove.prop('disabled',true);   
      })     
    }
  })
  function deleteItem(ids,next){
    $.ajax({
      type:"DELETE",
      url:"/stage/delete",
      data:{
        ids:ids
      },
      success:function(){
        next()
      }
    })
  }
 function getIdSelections() {
      var rowids=$.map($table.bootstrapTable('getSelections'), function (row) {
          return row._id
      });
      var ids=$.map($table.bootstrapTable('getSelections'), function (row) {
          return row._id
      });
      return {rowids:rowids,ids:ids};
  }
  $toolbar.find('select').change(function(){
    $table.bootstrapTable({
      exportDataType:$(this).val()
    })
  })
  // $table.bootstrapTable('load',json); 

  // func add & edit
  // add
  $add.click(function(){
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });

  // form validate
  $form.formValidation({
    framework:'bootstrap',
    excluded:':disabled',
    icon:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh',
    },
    fields:{
      id:{
        validators:{
          notEmpty:{
            message:'the ID is required'
          },
          stringLength:{
            min:1,
            max:6,
            message:'The ID must be more than 1 and less than 6 characters long'
          },
          regexp:{
            regexp:/^[0-9]+$/,
            message:'The ID can only consist of number'
          }
        }
      },
      name:{},
      stage_description:{},
      output:{},
      preview_in:{},
      preview_out:{}
    }
  }).on('success.form.fv',function(e){
      // Prevent form submission
      e.preventDefault();
      var $form=$(e.target);
      var data=$form.serializeObject();
      // 表单reset
      var add=$form.attr("data-add");
      var index=$form.attr("data-index");
      if(data._id==""||data._id==null){
        delete data._id;
      }
      $.post("/stage/edit",data).done(function(res){
        // var data=JSON.parse(data);
        if(res!=null){
          if(add=="true"){
            $table.bootstrapTable('insertRow',{index:1,row:res});
          }else{
            $table.bootstrapTable('updateRow',{index:index,row:res});       
          }
          $modal.modal('hide');
          $form.formValidation('resetForm', true);
        }
      })
    })

})