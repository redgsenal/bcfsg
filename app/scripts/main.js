var $imglist = $('.social__list');
var loadmore = $('.social__nav-btn.more');
console.log(loadmore);
function loadImages(){
	// load posts
	var feedurl = 'https://users.dialogfeed.com/en/snippet/breastawareness.json?api_key=ece3c27d5e0cf739753078365bc9fafd';
	var lastid = loadmore.data('since-uid');
	if (lastid){
		feedurl = feedurl + '&since_id=' + lastid;
	}
	console.log('feedurl', feedurl);
	$.ajax({
		url: feedurl
	}).done(function(data){
		var posts = $(data.news_feed.posts.post);
		var lastuid = 0;
		var cnt = 0;
		$.each(posts, function(i, post){
			if (post.uid > 0){
				console.log(post);
				var $contr = $('<div class="social__post"></div>');
				var img = post.content.content_picture;
				//console.log('img ', img);
				if (!img)
					img = post.content.content_video_thumbnail;
				var $imgcntr = $('<img src="' + img + '">');
				$contr.append($imgcntr);
				$imglist.append($contr);
				if (lastuid == 0)
					lastuid = post.uid;
				else{
					lastuid = lastuid < post.uid ? lastuid : post.uid;
				}
				//lastuid = lastuid == 0 ? post.uid : (lastuid > post.uid  ? post.uid : lastuid);
				console.log('lastuid, ', lastuid);
				console.log('uid, ', post.uid);
				loadmore.data('since-uid', lastuid);
				console.log(cnt);
				/*if (++cnt > 9)
					return false;*/
			}
		});
	});
}

$(function(){

	// load count
	var $counter = $('.awareness_count');
	$.ajax({
		url: 'http://users.dialogfeed.com/en/api/profiles?api_key=ece3c27d5e0cf739753078365bc9fafd'
	}).done(function(data){
		$counter.text(data[0].profile.Posts);
	});

	loadImages();

	loadmore.click(function(){
		loadImages();
		console.log('click');
	});
});