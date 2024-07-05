export function getImgSrc(richtext,num=3){
	let imgList=[]
	richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g,(match,capture)=>{
		imgList.push(capture)
	})
	imgList=imgList.slice(0,num)
	return imgList
}