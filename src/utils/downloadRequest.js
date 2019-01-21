import axios from 'axios';
import qs from 'qs';

export default function downloadFile(url, option, fileName) {
  const options = {
    ...option,
  };
  let fileName1 = fileName;
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.responseType = 'blob';
  newOptions.data = qs.stringify(newOptions.body, {
    allowDots: true,
  });
  return axios(url, newOptions)
    .then(response => {
      console.log(
        response.headers['content-disposition'].split(';')[2].substring('filename='.length + 1)
      );
      const blob = new Blob([response.data]);
      if (!fileName1) {
        fileName1 = response.headers['content-disposition']
          .split(';')[2]
          .substring('filename='.length + 1);
      }
      if (!fileName1) {
        fileName1 = 'unkonwn';
      }
      while (fileName1.indexOf('"') >= 0) {
        fileName1 = fileName1.replace('"', '');
      }
      console.log(fileName1);
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a');
        elink.download = fileName1;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, '4.war');
      }
      return response.data;
    })
    .catch(e => {
      console.log(e);
    });
}
