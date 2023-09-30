# Node.js

Status: Node.js Odin

1. Javascript event loop
    1. Javascript is a single threaded language which is run inside V8 in a browser. 
    2. Some components of code like ajax requests, setTimeOut() can take long long time and hold other components due to single threaded property. 
    3. Therefore, these components rely on web api to run and event loops ensures they are not blocking the main thread. 
    4. So, this main thread is essentially the stack running sync code and async code which is handled by web api is sent to callback queue where event loop holds it and wait for stack to empty and then pushes the callback queue to the stack. 
        1. here, due to stack not being empty and event loop holding back callback queue, setTimeOut boundations becomes “atleast 5 seconds” instead of “5 seconds”
    5. Another aspect is Render queue, which is also paused when any code is being run in main thread. So, it recommended to send heavy operations to web api for a smooth rendering UI experience for user. 

1. V8 engine 
    1. it is js engine which parses and executes code inside chrome 
    2. it is browser independent
    3. it has JIT (just in time) compilation which instead of intrepreting js code line by line, it does - 
        1. translates JS in low level machine language at runtime which is directly executed by CPU 
        2. this gives very fast execution speeds 
        3. it does add delay to code preparation due to translating step but after compilation, it makes up for it
    4. this whole thing has enabled JS code to become very complex