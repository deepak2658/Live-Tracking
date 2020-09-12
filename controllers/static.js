exports.user1Page = (req,res,next)=>{
    res.render('user1.pug');
}

exports.user2Page = (req,res,next)=>{
    const drop_point = req.body.drop_point;
    console.log(drop_point)
    
    res.render('user2.pug',{drop_point:drop_point})
}