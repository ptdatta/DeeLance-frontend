function formateDate(creationDate) {
  const now = new Date();
  const postDate = new Date(creationDate);
  const timeDifference = now - postDate;

  // Convert milliseconds to minutes
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));

  if (minutesAgo < 1) {
    return "Posted just now";
  }
  if (minutesAgo === 1) {
    return "Posted 1 minute ago";
  }
  if (minutesAgo < 60) {
    return `Posted ${minutesAgo} minutes ago`;
  }
  // You can add similar logic for hours, days, etc. if needed
  // For simplicity, let's just return the default date format
  return `Posted on ${postDate.toLocaleDateString()}`;
}

export default formateDate;
