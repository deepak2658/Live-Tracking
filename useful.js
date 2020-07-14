// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// app.post('/driver.html',(req,res,next)=>{
//     res.locals.user = req.body;  
//     res.locals.authenticated = !req.user.anonymous;
//     next();
// })

// app.use(function(req, res, next) {
//     if (res.locals.authenticated) {
//         console.log(res.locals.user);
//     }
//     next();
// });