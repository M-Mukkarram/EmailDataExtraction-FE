import { RuleObject } from 'antd/es/form';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

import { APP_CONFIG } from '../constants/app.constant';
import {
  DATE_FORMAT_6,
  DATE_FORMAT_7,
} from '@/constants/date-format.constants';

type PDFDataType = 'base64' | 'binary';

export const formatDate = (
  _date: string | Date = '',
  _format: string = DATE_FORMAT_6
) => {
  const new_date = new Date(_date);
  return dayjs(new_date).format(_format);
};

export const formatDateWithDay = (
  _date: string | Date = '',
  _format: string = DATE_FORMAT_7
) => {
  const new_date = new Date(_date);
  return dayjs(new_date).format(_format);
};

export const formatDateWithDayAfterYear = (
  _date: string | Date = '',
  years: number,
  _format: string = DATE_FORMAT_7
) => {
  const new_date = dayjs(_date).add(years, 'year');
  return new_date.format(_format);
};

export const formatCurrency = (value: number | bigint, locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  }).format(value);
};

export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export const getBlobMediaString = async (mediaFile: string) => {
  const media = await fetch(mediaFile);
  return media.blob();
};

export function createDynamicUrl(
  baseUrl: string,
  queryParams: Record<string, unknown>
) {
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue =
        typeof value === 'string'
          ? encodeURIComponent(value)
          : value?.toString();
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');

  let url = baseUrl.replace(/{([^}]+)}/g, (_, key) => {
    // Used Object.prototype.hasOwnProperty.call() for a safer check
    if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
      const value = queryParams[key] as string | number | boolean;
      return encodeURIComponent(value.toString());
    }
    return encodeURIComponent(key);
  });

  url += '?' + queryString;
  return url;
}

export function downloadCSV(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'text/csv' });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();

  // Clean up: Remove the link from the DOM and revoke the Blob URL
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

export function uuid() {
  return uuidv4();
}

export const getCurrentWeekDates = () => {
  const curr = new Date();
  const week = [];

  for (let i = 1; i <= 7; i++) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push({ date: day, day: dayjs(day).daysInMonth() });
  }

  return week;
};

export function DiffBetweenTwoDatesInHours(
  firstDate: string | Date,
  secondDate: string | Date
) {
  return dayjs(secondDate).diff(dayjs(firstDate), 'hour');
}

export function createAssetsUrl(path: string) {
  return APP_CONFIG.api.assetsUrl + '/' + path;
}

export function validateNumberGreaterThanValueRule(
  value: number,
  greaterThan: number
) {
  if (value && Number(value) <= greaterThan) {
    return Promise.reject(
      new Error(`Please enter a number greater than ${greaterThan}`)
    );
  }
  return Promise.resolve();
}

export const getPreviousHours = (hour: number) => {
  return Array.from({ length: hour }, (_, i) => i);
};

export function openLinkInNewTab(url?: string): void {
  if (url) {
    window.open(url, '_blank');
  }
}

export function redirectToGoogleMaps(searchQuery: string) {
  const encodedQuery = encodeURIComponent(searchQuery);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  openLinkInNewTab(googleMapsUrl);
}

export const validateZipCode = (_: RuleObject, value: number) => {
  if (!value) {
    return Promise.reject(new Error(''));
  }
  const zipCodeString = value.toString();
  if (zipCodeString.length !== 5) {
    return Promise.reject(new Error('Zip Code must be 5 characters'));
  }
  return Promise.resolve();
};

export function onScrollEnd(
  e: React.UIEvent<HTMLDivElement>,
  cb: () => void,
  offset = 10
) {
  const systemHeight = e.currentTarget.scrollHeight - e.currentTarget.scrollTop;
  const bottom = systemHeight - offset <= e.currentTarget.clientHeight;
  if (bottom) {
    cb?.();
  }
}

export function convertToSpacedFormat(inputString: string): string {
  return _.chain(inputString)
    .split('_')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
    .value();
}

export function downloadPDF(
  pdfData: string | Uint8Array,
  fileName: string = 'document.pdf'
): void {
  const dataType: PDFDataType =
    typeof pdfData === 'string' ? 'base64' : 'binary';

  let blob: Blob;
  if (dataType === 'base64') {
    blob = base64ToBlob(pdfData, 'application/pdf');
  } else {
    blob = new Blob([pdfData], { type: 'application/pdf' });
  }

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

function base64ToBlob(input: string | Uint8Array, mimeType: string): Blob {
  let blob: Blob;
  if (typeof input === 'string') {
    const bytes = atob(input.split(',')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    blob = new Blob([ab], { type: mimeType });
  } else {
    blob = new Blob([input], { type: mimeType });
  }
  return blob;
}
