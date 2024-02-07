function adaptBusinessResponse(businessResponse) {
  const { photos, name, location, phone, review_count } = businessResponse;

  return {
    image: photos.length > 0 ? photos[0] : 'default image', // check it case it has no photos, check image does not load
    name,
    address: location.formatted_address,
    phone,
    reviewsCount: review_count,
  };
}

export { adaptBusinessResponse };