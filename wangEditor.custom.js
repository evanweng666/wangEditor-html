const E = window.wangEditor
const { BtnMenu } = E
class HtmlMenu extends BtnMenu {
    constructor(editor) {
        const $elem = E.$(
            `<div class="w-e-menu">
              <i class="fa fa-code"></i>
            </div>`
        )
        super($elem, editor)
    }
    clickHandler() {
    	this.editor.isHtml = !this.editor.isHtml
        let _source = null;
        if (this.editor.isHtml) {
        	_source = this.editor.txt.html().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;")
        } else {
        	_source = this.editor.txt.text().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ")
        }
        this.editor.txt.html(_source)
		this.tryChangeActive()
    }
    tryChangeActive() {
    	if (this.editor.isHtml) {
    		this.active()
	} else {
		this.unActive()
	}
    }
}
// 创建富文本编辑器
function createEditor(ele) {
	const editor = new E(ele)
	editor.config.height = 400                                    // 设置高度
	editor.config.focus = false                                   // 不获得焦点
	editor.isHtml = false                                         // 默认不激活源码模式
	editor.menus.extend('htmlMenu', HtmlMenu)
	editor.config.menus = editor.config.menus.concat('htmlMenu')  // 添加源码模式菜单
	editor.config.pasteFilterStyle = false                        // 关闭粘贴过滤
	editor.config.uploadImgServer = '/wangEditor/upload'          // 图片上传路径
	editor.config.uploadFileName = 'file'                         // 图片上传名称
	editor.config.uploadImgMaxSize = 50 * 1024 * 1024             // 图片大小限制50M
	editor.config.uploadImgTimeout = 60 * 1000                    // 图片上传超时60s
	editor.create()
	return editor
}
// 获取富文本内容
function getEditorContent(editor) {
	if (editor.isHtml) {
		return editor.txt.text().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ")
	} else {
		return editor.txt.html()
	}
}
