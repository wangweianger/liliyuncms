/*gulp配置的功能列表
* 1.编译sass
* 2.压缩CSS
* 3.重命名CSS
* 4.合并CSS 
* 5.自动添加浏览器前缀
* 6.压缩JS
* 7.监听文件并刷新浏览器
*/
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    sass = require('gulp-sass'),                //sass编译
    autoprefixer = require('gulp-autoprefixer'),    //增加浏览器前缀
    minifyCss = require('gulp-minify-css'),            //压缩css
    rename = require("gulp-rename"),                //重命名
    connect = require('gulp-connect'),        //创建服务 并实时的刷新浏览器
    uglify = require('gulp-uglify'),          //压缩js
    concat = require('gulp-concat'),        //合并js
    imagemin = require('gulp-imagemin'),    //图片压缩 
    pngquant = require('imagemin-pngquant'),  //深度压缩图片
    clean = require('gulp-clean'),  //清除文件
    rev = require('gulp-rev'), //更改版本名
    revCollector = require('gulp-rev-collector'), //更改html路径
    replace = require('gulp-replace'),  //文件替换
    gulpSequence = require('gulp-sequence');  //gulp任务执行顺序

  //开发路径
  var bathPath="www/"; //根目录
  var rootPath="liliyun"; //项目路径

  //生产线online文件
  var onlineSchool="www/online/"+rootPath;   //打包cms路径
   

/*-----------------------------------------开发环境时执行的任务-------------------------------------------------------*/
 
  //创建connect服务
  gulp.task("connect",function(){
    connect.server({
      root:bathPath,
      port: 8080,
      livereload:true
    });
  });

  //监听html文件
  gulp.task('html',function(){
    gulp.src(bathPath+'**/*html')
    .pipe(connect.reload());
  })

  //编译sass 添加浏览器前缀 
  gulp.task('sass', function () {
     return gulp.src(bathPath+rootPath+'/assets/sass/*.scss')
     .pipe(sass().on('error', sass.logError))
     .pipe(gulp.dest(bathPath+rootPath+'/assets/css'))
  });

  //压缩css 并合并css
  gulp.task('yasuoCss',function(){
     return gulp.src(bathPath+'**/assets/css/main.css')
      //.pipe(concat('all.css')) //合并
      .pipe(minifyCss()) //压缩css
      .pipe(rename("mian-min.css")) //重命名
      .pipe(gulp.dest(bathPath+"**/assets/css-min"));   //保存
  })

  //压缩js 
  gulp.task('js',function(){
    return gulp.src([bathPath+rootPath+'/assets/js/*.js'])
    .pipe(uglify())   //压缩js
    .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
    .pipe(gulp.dest(bathPath+rootPath+'/assets/js-min'));
  })

  //压缩图片
  gulp.task('smallImg', function(){
    return gulp.src(bathPath+'/assets/img/*')
    .pipe(imagemin({
        progressive: true,
        optimizationLevel: 5,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(bathPath+'**/assets/images'));
  });

  // 监视源文件变化自动cd编译
  gulp.task('watch', function() {
     gulp.watch(bathPath+'**/assets/sass/*.scss', ['sass']);
     gulp.watch(bathPath+'**/*.html',['html']);    //监听app下的html文件的改变
     gulp.watch(bathPath+'**/assets/sass/*.*',['html']); //监听css 刷新页面
     gulp.watch(bathPath+'**/assets/js/*.*',['html']); //监听js  刷新页面 
     gulp.watch(bathPath+'**/assets/js/**/*.*',['html']); //监听js  刷新页面 
  });

  //执行压缩css 和 js的任务
  gulp.task('yasuo',['js','yasuoCss','smallImg']);

  //默认执行 编译sass 监听css js等的变化
  gulp.task('default',['sass','connect','watch']); //定义默认任务

/*--------------------------------------生成生产环境开始执行的任务----------------------------------------------------*/
  
  // 生成生产线文件
  gulp.task('devonline', function () {
      return gulp.src(bathPath+rootPath+"/**")
          .pipe( gulp.dest(onlineSchool) );
  });                                                                                       

    //压缩css 
  gulp.task('yasuoCss',function(){
     return gulp.src(onlineSchool+'/assets/css/*.css')
      .pipe(minifyCss()) //压缩css
      .pipe(gulp.dest(onlineSchool+"/assets/css"));   //保存
  })
  
  //压缩js 
  gulp.task('yasuoJs',function(){
    return gulp.src([onlineSchool+'/assets/js/*.js'])
    .pipe(uglify())   //压缩js
    .pipe(gulp.dest(onlineSchool+'/assets/js'));
  })
  //压缩ng-js 
  gulp.task('yasuoNgJs',function(){
    return gulp.src([onlineSchool+'/assets/js/ng-js/*.js'])
    .pipe(uglify())   //压缩js
    .pipe(gulp.dest(onlineSchool+'/assets/js/ng-js'));
  })
  //压缩common-js 
  gulp.task('yasuoCommonJs',function(){
    return gulp.src([onlineSchool+'/assets/common/js/*.js'])
    .pipe(uglify())   //压缩js
    .pipe(gulp.dest(onlineSchool+'/assets/common/js'));
  })

  // 生成json css替换文件
  gulp.task('cssrev', function () {
      return gulp.src(onlineSchool+'/assets/css/*.css')
          .pipe(rev())
          .pipe( rev.manifest() )
          .pipe( gulp.dest( onlineSchool+'/rev/css' ) );
  });
  // 生成json js替换文件
  gulp.task('jsrev', function () {
      return gulp.src([onlineSchool+'/assets/js/*.js',onlineSchool+'/assets/common/js/*.js',onlineSchool+'/assets/js/ng-js/*.js'])
          .pipe(rev())
          .pipe( rev.manifest() )
          .pipe( gulp.dest( onlineSchool+'/rev/js' ) );
  });

  //开始替换html 中的js和css
  gulp.task('revhtml', function () {
      return gulp.src([onlineSchool+'/rev/**/*.json', onlineSchool+'/*.html'])
          .pipe( revCollector({
              replaceReved: true,
          }) )
          .pipe( gulp.dest(onlineSchool+'/') );
  });
  //开始替换html 中的js和css
  gulp.task('revhtmlchr', function () {
      return gulp.src([onlineSchool+'/rev/**/*.json', onlineSchool+'/datas/*.html'])
          .pipe( revCollector({
              replaceReved: true,
          }) )
          .pipe( gulp.dest(onlineSchool+'/datas/') );
  });

  //开始替换commonStart.js
  gulp.task('commonStarthtml', function () {
      return gulp.src([onlineSchool+'/rev/**/*.json', onlineSchool+'/assets/common/js/commonStart.js'])
          .pipe( revCollector({
              replaceReved: true,
          }) )
          .pipe( gulp.dest(onlineSchool+'/assets/common/js/') );
  });

  //替换commonStart网页根目录
  gulp.task('replaceCommonStart', function(){
    gulp.src(onlineSchool+'/assets/common/js/commonStart.js')
      .pipe(replace('http://xc.res.com:8080/'+rootPath+'/', 'http://"+window.location.host+"/'))
      .pipe(gulp.dest(onlineSchool+'/assets/common/js/'));
  });

  //替换common接口api地址
  gulp.task('replaceCommon', function(){
    gulp.src(onlineSchool+'/assets/common/js/common.js') 
      .pipe(replace(/192.168.1.99:\d+/, '"+window.location.host+"'))
      .pipe(gulp.dest(onlineSchool+'/assets/common/js/'));
  });

  //gulp任务 执行顺序 同步模式  ( []以内为异步模式 )
  gulp.task('revonline', gulpSequence('devonline',['yasuoCss','yasuoJs','yasuoNgJs','yasuoCommonJs'], ['cssrev','jsrev'], ['revhtml','commonStarthtml','revhtmlchr'],['replaceCommonStart','replaceCommon']));


