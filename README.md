### 手写分布式ID服务

#### 压测

```
处理器名称：	四核Intel Core i7
处理器速度：	2.3 GHz
内存：	     16 GB
```

> wrk -t4 -c100 -d30s http://127.0.0.1:3002/default



#### 号段模式

> 暂存文件 Requests/sec:  16715.13

> 暂存内存 Requests/sec:  33757.86

#### snowflake

> Requests/sec:  33205.21