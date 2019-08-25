环境：
Angular CLI: 8.2.2

# 到 p72（ chapter 4.2)

存在的问题是：在 todo header 的地方，如果回车过快，会导致输入内容是空，原因是

```typescript
constructor(private elementRef: ElementRef) {
    const event$ = fromEvent(elementRef.nativeElement, 'keyup')
            .pipe(
              map((e:any) => e.target.value),
              debounceTime(this.delay)  --> 告知父组件，有400毫秒延迟
            );

      event$.subscribe( (input: string)  => {
        console.log(`in ping089  ` + typeof input  +  ", input: " + input  ) ;
        this.textChanges.emit( input ) ;
   });
  }
```

# 到 p90 (chapter 4 完成)

由于 angular2-mdl 存在很大的问题， 我不再做兼容性修改了。


# master 版本引入了Rx


#运行

json-server  src/app/data2.json  依赖这个服务。

在计算机领域，响应式编程是一种面向数据流和变化传播的编程模式
#  存在问题

1： 如何埋点 
         可能方案：类似log处理，消息发送到后端。

2:    routing 里面如果使用  canLoad, 如果对应的页面已经有用户 输入内容了，怎么办 ？  p139 内容
       可能方案：也许具体页面接受全局消息，具体如何处理，交给具体模块处理。可以提示用户（您已经退出，
      如果用户点击别的连接，不让点击）

 3:  ts文件里面的subscribe是否要执行对应的unsubscribe(在ngOnDestroy) ?      如果使用async, 就不需要订阅和取消订阅的。
