/**
 * Auto-generated price list from Google Sheets.
 * Do not edit manually — run: npm run update-prices
 *
 * Source: https://docs.google.com/spreadsheets/d/1-IUP7OdeZGyxACiC_Uvc0nLtO7oJTsiANHOX8QtV3rQ/edit?gid=0
 * Generated: 2026-07-13T07:36:28.576Z
 *
 * Keys are time slots (H:MM). Values are prices in UAH.
 * special_* keys are package rows without a duration label in the sheet.
 */

/** @type {Record<string, {
 *   minutes: number | null,
 *   label: string,
 *   standard: { weekday: number | null, weekend: number | null },
 *   maxi: { weekday: number | null, weekend: number | null },
 *   discount: number
 * }>} */
export const prices = {
  "0:15": {
    "minutes": 15,
    "label": "0 год. 15 хв.",
    "standard": {
      "weekday": 100,
      "weekend": 130
    },
    "maxi": {
      "weekday": 120,
      "weekend": 150
    },
    "discount": 0
  },
  "0:30": {
    "minutes": 30,
    "label": "0 год. 30 хв.",
    "standard": {
      "weekday": 200,
      "weekend": 250
    },
    "maxi": {
      "weekday": 230,
      "weekend": 290
    },
    "discount": 0
  },
  "0:45": {
    "minutes": 45,
    "label": "0 год. 45 хв.",
    "standard": {
      "weekday": 290,
      "weekend": 370
    },
    "maxi": {
      "weekday": 340,
      "weekend": 430
    },
    "discount": 0
  },
  "1:00": {
    "minutes": 60,
    "label": "1 год. 0 хв.",
    "standard": {
      "weekday": 320,
      "weekend": 400
    },
    "maxi": {
      "weekday": 370,
      "weekend": 470
    },
    "discount": 0
  },
  "1:15": {
    "minutes": 75,
    "label": "1 год. 15 хв.",
    "standard": {
      "weekday": 400,
      "weekend": 500
    },
    "maxi": {
      "weekday": 460,
      "weekend": 580
    },
    "discount": 0
  },
  "1:30": {
    "minutes": 90,
    "label": "1 год. 30 хв.",
    "standard": {
      "weekday": 450,
      "weekend": 570
    },
    "maxi": {
      "weekday": 520,
      "weekend": 650
    },
    "discount": 5
  },
  "1:45": {
    "minutes": 105,
    "label": "1 год. 45 хв.",
    "standard": {
      "weekday": 530,
      "weekend": 670
    },
    "maxi": {
      "weekday": 610,
      "weekend": 770
    },
    "discount": 5
  },
  "2:00": {
    "minutes": 120,
    "label": "2 год. 0 хв.",
    "standard": {
      "weekday": 570,
      "weekend": 720
    },
    "maxi": {
      "weekday": 660,
      "weekend": 830
    },
    "discount": 10
  },
  "2:15": {
    "minutes": 135,
    "label": "2 год. 15 хв.",
    "standard": {
      "weekday": 640,
      "weekend": 800
    },
    "maxi": {
      "weekday": 740,
      "weekend": 930
    },
    "discount": 10
  },
  "2:30": {
    "minutes": 150,
    "label": "2 год. 30 хв.",
    "standard": {
      "weekday": 720,
      "weekend": 900
    },
    "maxi": {
      "weekday": 830,
      "weekend": 1040
    },
    "discount": 10
  },
  "2:45": {
    "minutes": 165,
    "label": "2 год. 45 хв.",
    "standard": {
      "weekday": 790,
      "weekend": 990
    },
    "maxi": {
      "weekday": 910,
      "weekend": 1140
    },
    "discount": 10
  },
  "3:00": {
    "minutes": 180,
    "label": "3 год. 0 хв.",
    "standard": {
      "weekday": 810,
      "weekend": 1020
    },
    "maxi": {
      "weekday": 940,
      "weekend": 1180
    },
    "discount": 15
  },
  "3:15": {
    "minutes": 195,
    "label": "3 год. 15 хв.",
    "standard": {
      "weekday": 880,
      "weekend": 1100
    },
    "maxi": {
      "weekday": 1020,
      "weekend": 1280
    },
    "discount": 15
  },
  "3:30": {
    "minutes": 210,
    "label": "3 год. 30 хв.",
    "standard": {
      "weekday": 950,
      "weekend": 1190
    },
    "maxi": {
      "weekday": 1100,
      "weekend": 1380
    },
    "discount": 15
  },
  "3:45": {
    "minutes": 225,
    "label": "3 год. 45 хв.",
    "standard": {
      "weekday": 1020,
      "weekend": 1280
    },
    "maxi": {
      "weekday": 1180,
      "weekend": 1480
    },
    "discount": 15
  },
  "4:00": {
    "minutes": 240,
    "label": "4 год. 0 хв.",
    "standard": {
      "weekday": 1020,
      "weekend": 1280
    },
    "maxi": {
      "weekday": 1180,
      "weekend": 1480
    },
    "discount": 20
  },
  "special_1": {
    "minutes": null,
    "label": "special_1",
    "standard": {
      "weekday": 1200,
      "weekend": 1500
    },
    "maxi": {
      "weekday": 1380,
      "weekend": 1730
    },
    "discount": 25
  },
  "special_2": {
    "minutes": null,
    "label": "special_2",
    "standard": {
      "weekday": 1280,
      "weekend": 1600
    },
    "maxi": {
      "weekday": 1480,
      "weekend": 1850
    },
    "discount": 50
  }
}

/** Ordered list of all price rows (same data as `prices`) */
export const priceList = [
  {
    "time": "0:15",
    "minutes": 15,
    "label": "0 год. 15 хв.",
    "standard": {
      "weekday": 100,
      "weekend": 130
    },
    "maxi": {
      "weekday": 120,
      "weekend": 150
    },
    "discount": 0
  },
  {
    "time": "0:30",
    "minutes": 30,
    "label": "0 год. 30 хв.",
    "standard": {
      "weekday": 200,
      "weekend": 250
    },
    "maxi": {
      "weekday": 230,
      "weekend": 290
    },
    "discount": 0
  },
  {
    "time": "0:45",
    "minutes": 45,
    "label": "0 год. 45 хв.",
    "standard": {
      "weekday": 290,
      "weekend": 370
    },
    "maxi": {
      "weekday": 340,
      "weekend": 430
    },
    "discount": 0
  },
  {
    "time": "1:00",
    "minutes": 60,
    "label": "1 год. 0 хв.",
    "standard": {
      "weekday": 320,
      "weekend": 400
    },
    "maxi": {
      "weekday": 370,
      "weekend": 470
    },
    "discount": 0
  },
  {
    "time": "1:15",
    "minutes": 75,
    "label": "1 год. 15 хв.",
    "standard": {
      "weekday": 400,
      "weekend": 500
    },
    "maxi": {
      "weekday": 460,
      "weekend": 580
    },
    "discount": 0
  },
  {
    "time": "1:30",
    "minutes": 90,
    "label": "1 год. 30 хв.",
    "standard": {
      "weekday": 450,
      "weekend": 570
    },
    "maxi": {
      "weekday": 520,
      "weekend": 650
    },
    "discount": 5
  },
  {
    "time": "1:45",
    "minutes": 105,
    "label": "1 год. 45 хв.",
    "standard": {
      "weekday": 530,
      "weekend": 670
    },
    "maxi": {
      "weekday": 610,
      "weekend": 770
    },
    "discount": 5
  },
  {
    "time": "2:00",
    "minutes": 120,
    "label": "2 год. 0 хв.",
    "standard": {
      "weekday": 570,
      "weekend": 720
    },
    "maxi": {
      "weekday": 660,
      "weekend": 830
    },
    "discount": 10
  },
  {
    "time": "2:15",
    "minutes": 135,
    "label": "2 год. 15 хв.",
    "standard": {
      "weekday": 640,
      "weekend": 800
    },
    "maxi": {
      "weekday": 740,
      "weekend": 930
    },
    "discount": 10
  },
  {
    "time": "2:30",
    "minutes": 150,
    "label": "2 год. 30 хв.",
    "standard": {
      "weekday": 720,
      "weekend": 900
    },
    "maxi": {
      "weekday": 830,
      "weekend": 1040
    },
    "discount": 10
  },
  {
    "time": "2:45",
    "minutes": 165,
    "label": "2 год. 45 хв.",
    "standard": {
      "weekday": 790,
      "weekend": 990
    },
    "maxi": {
      "weekday": 910,
      "weekend": 1140
    },
    "discount": 10
  },
  {
    "time": "3:00",
    "minutes": 180,
    "label": "3 год. 0 хв.",
    "standard": {
      "weekday": 810,
      "weekend": 1020
    },
    "maxi": {
      "weekday": 940,
      "weekend": 1180
    },
    "discount": 15
  },
  {
    "time": "3:15",
    "minutes": 195,
    "label": "3 год. 15 хв.",
    "standard": {
      "weekday": 880,
      "weekend": 1100
    },
    "maxi": {
      "weekday": 1020,
      "weekend": 1280
    },
    "discount": 15
  },
  {
    "time": "3:30",
    "minutes": 210,
    "label": "3 год. 30 хв.",
    "standard": {
      "weekday": 950,
      "weekend": 1190
    },
    "maxi": {
      "weekday": 1100,
      "weekend": 1380
    },
    "discount": 15
  },
  {
    "time": "3:45",
    "minutes": 225,
    "label": "3 год. 45 хв.",
    "standard": {
      "weekday": 1020,
      "weekend": 1280
    },
    "maxi": {
      "weekday": 1180,
      "weekend": 1480
    },
    "discount": 15
  },
  {
    "time": "4:00",
    "minutes": 240,
    "label": "4 год. 0 хв.",
    "standard": {
      "weekday": 1020,
      "weekend": 1280
    },
    "maxi": {
      "weekday": 1180,
      "weekend": 1480
    },
    "discount": 20
  },
  {
    "time": "special_1",
    "minutes": null,
    "label": "special_1",
    "standard": {
      "weekday": 1200,
      "weekend": 1500
    },
    "maxi": {
      "weekday": 1380,
      "weekend": 1730
    },
    "discount": 25
  },
  {
    "time": "special_2",
    "minutes": null,
    "label": "special_2",
    "standard": {
      "weekday": 1280,
      "weekend": 1600
    },
    "maxi": {
      "weekday": 1480,
      "weekend": 1850
    },
    "discount": 50
  }
]

/** Convenience: standard weekday price for a time key, e.g. getPrice('1:00') → 320 */
export function getPrice(time, { kit = 'standard', day = 'weekday' } = {}) {
  const row = prices[time]
  if (!row) return null
  return row[kit]?.[day] ?? null
}

export default prices
