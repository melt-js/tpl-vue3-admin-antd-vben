import{D as t,On as e,k as p,mt as c,qt as a,v as m}from"./runtime-core.esm-bundler-Bt9lA6T4.js";import{A as f,x as s}from"./libTypes-Bo9gf1Mv.js";import{t as i}from"./card-DAB6ltAU.js";import{t as n}from"./message-BMyIHn0f.js";var _={additionalInfo:{author:"Your Name",debug:!0,version:"1.3.10",versionCode:132},additionalNotes:"This JSON is used for demonstration purposes",tools:[{description:"Description of Tool 1",name:"Tool 1"},{description:"Description of Tool 2",name:"Tool 2"},{description:"Description of Tool 3",name:"Tool 3"},{description:"Description of Tool 4",name:"Tool 4"}]},r=JSON.parse(`
  {
	"id": "chatgpt-123",
	"object": "chat.completion",
	"created": 1677652288,
	"model": "gpt-3.5-turbo-0613",
	"system_fingerprint": "fp_44709d6fcb",
	"choices": [{
		"index": 0,
		"message": {
			"role": "assistant",
			"content": "Hello there, how may I assist you today?"
		},
		"finish_reason": "stop"
	}],
	"usage": {
		"prompt_tokens": 9,
		"completion_tokens": 12,
		"total_tokens": 21,
    "debug_mode": true
	},
  "debug": {
    "startAt": "2021-08-01T00:00:00Z",
    "logs": [
      {
        "timestamp": "2021-08-01T00:00:00Z",
        "message": "This is a debug message",
        "extra":[ "extra1", "extra2" ]
      },
      {
        "timestamp": "2021-08-01T00:00:01Z",
        "message": "This is another debug message",
        "extra":[ "extra3", "extra4" ]
      }
    ]
  }
}
  `),h=p({__name:"index",setup(g){function l(o){n.info(`点击了Key ${o}`)}function d(o){n.info(`点击了Value ${JSON.stringify(o)}`)}function u(o){n.success("已复制JSON")}return(o,v)=>(c(),m(e(f),{title:"Json Viewer",description:"一个渲染 JSON 结构数据的组件，支持复制、展开等，简单易用"},{default:a(()=>[t(e(i),{title:"默认配置"},{default:a(()=>[t(e(s),{value:e(_)},null,8,["value"])]),_:1}),t(e(i),{title:"可复制、默认展开3层、显示边框、事件处理",class:"mt-4"},{default:a(()=>[t(e(s),{value:e(r),"expand-depth":3,copyable:"",sort:!1,onKeyClick:l,onValueClick:d,onCopied:u,boxed:""},null,8,["value"])]),_:1}),t(e(i),{title:"预览模式",class:"mt-4"},{default:a(()=>[t(e(s),{value:e(r),copyable:"","preview-mode":"","show-array-index":!1},null,8,["value"])]),_:1})]),_:1}))}}),k=h;export{k as default};
