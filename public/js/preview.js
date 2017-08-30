$(function(){
  var json=[{
    "id":1,
    "name":"G1", 
    "rules":"1) 识别了潜在项目机会，完成相关的论证报告以及新产品的优先级2)识别了潜在项目机会，完成相关的论证报告以及新产品的优先级", 
    "standard":"1)潜在商业机会符合市场、客户以及竞争对手的研究分析结论2)潜在项目机会符合公司的实际情况和发展战略潜在商业机会报告说明了新产品构想的合理性和可性，包含潜在项目的时间窗和估算的研制项目总费，理由充分3)多种潜在产品构想优先级排序合理概念开发阶段作计划目标清晰，时间、资源计划合理、可行4)估算的潜在产品构想研制周期满足基于市场研究情况确认的项目时间窗口"
  },{
    "id":2,
    "name":"G2", 
    "rules":"进入G2 决策门至少应完成：a) 概念方案论证：识别了潜在项目的利益攸关方；完成了潜在产品构想的市场分析报告；进行了潜在产品构想的功能分析；完成了潜在项目的初步研制目标；完成了潜在产品构想的初步方案。b) 关键技术：形成了潜在项目的关键技术清单。c) 项目管理：形成了初步的商业论证报告；编制了初步的项目里程碑计划；完成了立项论证阶段工作计划。d) 风险管理：分析识别了项目风险，并给出了风险应对措施。", 
    "standard":"G2 决策门基本评审要求如下：a) 概念方案论证：利益攸关方识别和分析应充分、完整，至少包含：资方、客户、竞争者、政府、供应商、分包商、运营保障、非政府组织以及地方社区等；针对潜在产品构想，市场分析报告进行充分的细分场情况分析，至少包含：宏观经济形式、民航产业发展、航空公司需要等；潜在项目研制目标满足市场分析的结论以及公司的略规划；基于产品使用场景对民机产品系统的功能和方案进充分描述，满足项目研制目标要求；民机产品系统功能应至少包含飞机功能、培训功能支持功能以及设施功能等。b) 关键技术：提出的关键技术清单满足民机产品系统方案的要求考虑关键技术的成熟度，从进度和经费等方面具备可实施性。c) 项目管理：商业论证应符合市场分析的结论，针对潜在产品机提出市场占有率的预测、相关计划、产品描述、资源需求、产业发展、财务分析以及风管理等方面的内容；项目里程碑计划应满足项目目标要求，明确了潜在目重要的技术决策点以及商务决策点内容和时间上的要求；立项论证阶段工作计划目标清晰，时间、资源计划理、可行。"
  },{
    "id":3,
    "name":"G3", 
    "rules":"进入G3 决策门至少应完成：a) 概念方案论证：完成了民机产品系统商业要求和目标，以及相关的认工作；完成了潜在用户的需求分析；完成了民机产品系统方案；完成了顶层PBS。b) 关键技术：完成了关键技术的分析论证，形成了项目关键技术证报告。c) 资源管理：完成了项目条件保障建设方案。d) 项目管理：完成了项目立项建议书；完成了初步的WBS；完成了项目里程碑计划。e) 风险管理：分析识别了项目风险，并给出了风险应对措施。", 
    "standard":"G3 决策门基本评审要求如下：a) 概念方案论证：用户需求分析工作充分、准确的捕获了潜在用户的求；民机产品系统商业要求和目标考虑了市场分析的结以及潜在客户的要求，相关的要求和目标经过确认工作，满足客户的主流要求，确认工符合过程要求；民机产品系统的方案满足民机产品系统商业要求与标，方案具备经济合理性，与公司自身的建设发展以及战略规划相匹配。一般要求应产多个可行的方案。b) 关键技术：关键技术满足项目方案要求，关键技术攻关的路径行，时间上满足型号进度要求。c) 资源管理：提出的项目条件保障建设方案满足民机产品系统方的要求，在进度和经费方面具备可实施性，经济性、通用性上具备优势。d) 项目管理：初步的工作分解结构应依据PBS 进行分解；项目立项建议书中研制路径清晰、明确，至少应包项目研制周期、关键里程碑工作、经费概算、阶段投资强度、人力资源测算等。"
  },{
    "id":4,
    "name":"G4", 
    "rules":"", 
    "standard":""
  },{
    "id":5,
    "name":"G5", 
    "rules":"进入G5 决策门至少应完成：a)功能分析：完成了飞机功能定义与功能架构分析工作；定义了飞机功能接口控制文件。b) 需求分析：完成了飞机需求定义文件；冻结影响供应商合作意向签署部分的通用技术要求GTS）；完成了系统顶层需求定义文件。c) 需求确认：完成了飞机级需求、系统顶层需求确认工作。d) 设计综合：完成了飞机设计描述文件；完成了飞机设计验证总结报告。e) 产品实施：完成了制造总方案。f) 试验试飞：完成了试飞总方案。g) 结构强度：完成了第一轮载荷计算报告；完成了结构总体技术方案；完成了强度分析计算规范。h) 人为因素：完成了驾驶舱设计理念与要求；完成了驾驶舱布局图；完成了机组任务描述；完成了驾驶舱人机界面功能分配说明。i) 四性：完成了安全性通用数据文件；完成了飞机功能危险性评估；完成了飞机可靠性指标分配；完成了飞机维修性指标分配；完成了飞机测试性指标分配；完成了初步飞机安全性评估。j) 合格审定：完成了适航取证总方案。k) 客户服务：完成了客户服务总方案；完成了维修支持需求定义；完成了飞行/运行支持需求定义；完成了培训需求定义。l) 关键技术：完成了项目关键技术评估报告。m) 采供管理：完成与主要供应商LOI 或者MOU的签署准备（发动机供应商应完成LOI 或者MOU的签署）。n) 项目管理：更新了项目管理计划；细化了WBS。o) 风险管理:分析识别了项目风险，并给出了风险应对措施。p) 技术规划管理：完成了过程保证计划；完成了飞机安全性工作计划；完成了初步的飞机级集成计划；完成了初步的飞机级验证计划；",
     "standard":"G5 决策门基本评审要求如下：a) 功能分析：定义的飞机功能满足民机产品系统研制要求和目标出的功能要求，并且将飞机放在具体的使用场景下进行了功能的描述以及明确定义了功间的关系。b) 需求分析：系统顶层需求分解到了唯一的ATA章节，明确了每一个责任组织所需要执行的需求。c) 需求确认：飞机级以及系统顶层需求正确、完整，飞机级需求接到了民机产品系统研制要求和目标，系统顶层需求链接到了飞机级需求。确认工作需得利益攸关方的认可，包含客户与市场、设计、制造、试验试飞、客户支持等方面，确认过程合过程要求，确认结论合理；飞机级以及系统顶层需求符合可制造性、可维修性可测试性等面向X 的设计（DFX）方面要求。d) 设计综合：飞机级设计描述文件满足飞机级需求以及通用技术求，设计描述文件经过设计验证。设计验证工作需得到利益攸关方的认可，包含客户与场、设计、制造、试验试飞、客户支持等方面，验过程满足要求，验证结果合理。e) 产品实施：制造总方案满足民机产品系统研制要求和目标。f) 试验试飞：试飞总方案满足民机产品系统研制要求和目标。g) 人为因素：驾驶舱相关设计从人为因素角度评估合理；安全性、可靠性、维修性、测试性方面指标分析、配合理；飞机架构满足飞机安全性要求。h) 合格审定：适航取证总方案合理；建议的审定基础相关内容合理、有效落实到飞机级求等设计活动中。i) 客户服务：客户服务总方案合理。j) 关键技术：关键技术评估结论满足项目进度要求。k) 市场营销与交付：先锋用户确认飞机总体技术方案满足其预期要求。l) 采供管理：完成主要供应商的评估、筛选工作，从技术、商务角度充分、合理论证供应商选择依据。m) 项目管理：项目管理计划规划合理、可行。"
  },{
    "id":6,
    "name":"G6", 
    "rules":"进入G6 决策门至少应完成：a) 功能分析：完成了系统功能定义；完成了系统功能架构描述；完成了系统级功能接口控制文件。b) 需求分析：完成了系统需求文件；完成了设备顶层需求文件。c) 需求确认：完成了系统需求确认总结报告；完成了设备顶层需求确认总结报告。d) 设计综合：完成了系统描述文件；完成了飞机技术说明书；完成了物理ICD 的定义；完成了系统架构设计验证总结报告完成了设备级的PBS 分解。e) 产品实施：完成了工艺总方案；完成了装配协调方案；完成了质量检测方案。f) 结构强度：完成了第二轮的载荷计算报告；完成了结构初步设计方案；完成了结构初步方案强度校核报告；完成了强度初步设计阶段分析报告。g) 人为因素：完成了驾驶舱布置图；完成了人机界面设计要求；完成了飞机级、系统级可靠性预计报告；完成了飞机级、系统级维修性预计报告；完成了飞机级、系统级测试性预计报告；完成了系统FHA；完成了初步系统安全性评估；完成了系统级共因分析。h) 合格审定：完成了型号合格证申请；初步确定审定基础草案。i) 客户服务：完成了维修支持体系方案、飞行/运行支持体系方案以及培训体系方案。j) 关键技术：完成了项目关键技术评估报告。k) 采供管理：完成与主要供应商合同签署的准备工作。l) 项目管理：更新了项目管理计划；确定了WBS。m) 风险管理：完成了项目风险分析与评估报告。n) 技术规划管理：完成了系统级集成计划；完成了系统级验证计划", 
    "standard":"G6 决策门基本评审要求如下：a) 功能分析：定义的系统功能满足飞机功能以及需求提出的功能要求，并且将系统放在具体的使用场景下进行了功能的描述以及明确定义了功能间的关系。b) 需求分析：设备顶层需求分解到了唯一的设备。c) 需求确认：系统级以及设备顶层需求正确、完整，系统级需求链接到了飞机级需求，设备顶层需求链接到了系统级需求。确认工作需得到利益攸关方的认可，包含客户与市场、设计、制造、试验试飞、客户支持等方面，确认过程符合过程要求，确认结论合理；系统级以及设备顶层需求符合可制造性、可维修性、可测试性等DFX 方面要求。d) 设计综合：系统级设计描述文件满足系统级需求以及通用技术要求，设计描述文件经过设计验证。设计验证工作需得到利益攸关方的认可，包含客户与市场、设计、制造、试验试飞、客户支持等方面，验证过程满足要求，验证结果合理。e) 产品实施：工艺总方案、装配协调方案和质量检测方案合理可行，满足需求。f) 人为因素：驾驶舱相关设计从人为因素角度评估合理。g) 四性：安全性、可靠性、维修性、测试性方面指标分析、分配合理；系统架构满足系统安全性要求。h) 合格审定：初步确定的审定基础相关内容合理、有效落实到系统级需求等设计活动中。i) 客户服务：维修支持体系方案、飞行/运行支持体系方案以及培训体系方案满足需求定义要求。g) 关键技术：关键技术评估结论满足项目进度要求。k) 项目管理：项目管理计划规划合理、可行；详细设计阶段经费预算合理且有支持来源。l) 风险管理：分析识别了项目风险，并给出了风险应对措施。"
  }];
  var $table=$('#previewTable');
  var $remove=$('#previewRemove');
  var $toolbar=$('#previewToolbar');
  var $add=$('#previewAdd');
  var $form=$('#previewForm');
  var $modal=$('#previewModal');
  window.previewFormatter=function(value,row,index){
    return ['<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  window.previewActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      $form.attr({'data-add':'false','data-index':index});
      $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        $(item).val(row[name]);
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
      url:"/preview/delete",
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
      rules:{},
      standard:{}
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
      $.post("/preview/edit",data).done(function(res){
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