const express = require('express')
const router = express.Router()
const CONFIG = require('../config')
	// const sql = require('./assets/sql/sql')
	// 配置是否使用redis
const redis = CONFIG.redisEnable ? require('./assets/lib/redis') : null
const callbackModel = () => {
	return {
		flag: false,
		message: '',
		data: null
	}
}
let key = CONFIG.loginKey

router.use((req, res, next) => {
	// 中间件 - 指定的路由都将经过这里
	// 做访问拦截 - token验证等
	if ((req.url.indexOf('/login') !== -1) || req.session.user) {
		next()
		return
	}
	res.render('index', {
		title: '微信活动编辑系统',
		staticUrl: '/' + CONFIG.PROJECT_NAME + '/' + CONFIG.STATIC_RESOURCES_NAME,
		projectUrl: '/' + CONFIG.PROJECT_NAME
	})
})


router.get('/', function(req, res, next) {
	res.render('index', {
		title: '微信活动编辑系统',
		staticUrl: '/' + CONFIG.PROJECT_NAME + '/' + CONFIG.STATIC_RESOURCES_NAME,
		projectUrl: '/' + CONFIG.PROJECT_NAME

	})
})

router.get('/newAct', function(req, res, next) {
	res.render('newAct', {
		title: '新建活动',
		staticUrl: '/' + CONFIG.PROJECT_NAME + '/' + CONFIG.STATIC_RESOURCES_NAME,
		projectUrl: '/' + CONFIG.PROJECT_NAME
	})
})

router.post('/login', function(req, res, next) {
	let info = callbackModel()
	let userKey = req.body.key
	if (userKey.indexOf(key) !== -1) {
		req.session.user = 'admin'
		info.message = "登录成功"
		info.flag = true
		res.send(info)
	} else {
		info.message = "密码不正确"
		res.send(info)
	}
})


module.exports = router