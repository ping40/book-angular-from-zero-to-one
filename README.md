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
