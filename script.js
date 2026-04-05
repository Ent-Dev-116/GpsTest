let lastLat = null;
let lastLng = null;

function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // 地球の半径(m)
    const toRad = deg => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    if (lastLat !== null && lastLng !== null) {
        const distance = getDistance(lat, lng, lastLat, lastLng);

        if (distance < 2) {
            return; // 2m未満なら更新しない
        }
    }

    // 更新
    lastLat = lat;
    lastLng = lng;

    $('#loc').text(`緯度：${lat} 経度：${lng}`);
    $('#accuracy').text(accuracy);
}

function fail(err) {
    alert('位置情報の取得に失敗しました。エラーコード：' + err.code);
}

// watchPositionで監視
navigator.geolocation.watchPosition(success, fail, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000
});
