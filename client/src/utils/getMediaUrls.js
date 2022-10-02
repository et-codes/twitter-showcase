const getMediaUrls = (tweet, media) => {
  const mediaUrlList = [];
  if (tweet.attachments) {
    const mediaKeys = tweet.attachments.media_keys;
    mediaKeys.forEach(key => {
      const mediaObject = media.find(obj => obj.media_key === key);
      if (mediaObject.type === 'photo') {
        mediaUrlList.push(mediaObject.url);
      } else {
        mediaUrlList.push(mediaObject.preview_image_url);
      }
    });
  }
  return mediaUrlList;
}

export default getMediaUrls;