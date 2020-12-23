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
function createEditor(ele) {
	const editor = new E(ele)
	editor.config.height = 400
	editor.config.placeholder = '请输入正文'
	editor.config.focus = false
	editor.config.customAlert = function (s, t) {
		switch (t) {
		    case 'success':
		      	$.modal.msgSuccess(s)
		      	break
		    case 'info':
		    	$.modal.msgSuccess(s)
		      	break
		    case 'warning':
		      	$.modal.alertWarning(s)
		      	break
		    case 'error':
		      	$.modal.alertError(s)
		      	break
		    default:
		    	$.modal.msgSuccess(s)
		      	break
		  }
	}
	editor.isHtml = false
	editor.menus.extend('htmlMenu', HtmlMenu)
	editor.config.menus = editor.config.menus.concat('htmlMenu')
	editor.config.pasteFilterStyle = false                // 关闭粘贴过滤
	editor.config.uploadImgServer = '/wangEditor/upload'  // 图片上传路径
	editor.config.uploadFileName = 'file'                 // 图片上传名称
	editor.config.uploadImgMaxSize = 50 * 1024 * 1024     // 图片大小限制50M
	editor.config.uploadImgTimeout = 60 * 1000            // 图片上传超时60s
	editor.create()
	return editor
}

function getContent(editor) {
	if (editor.isHtml) {
		return editor.txt.text().replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&nbsp;/ig, " ")
	} else {
		return editor.txt.html()
	}
}