# Dates

Dates and times must always be formatted as specified in the [ISO 8601](https://en.wikipedia.org/wiki/ISO\_8601) specification.

## Examples

### Datetime

```
2020-08-07T14:30:00+02:00
```

➡️ August 7, 2020, at 2:30pm in the `UTC+2` timezone (for example Brussels in the summer).

```
2020-08-07T12:30:00Z
```

➡️ Same as above but in the `UTC+0` timezone, commonly denoted as `Z`. Note that the hour has shifted from `14` to `12` because the timezone has shifted.

If the hour remained the same but the timezone shifted, the datetimes would not be the same.

* `2020-08-07T14:30:00+02:00` = `2020-08-07T12:30:00+00:00`
* `2020-08-07T14:30:00+02:00` ≠ `2020-08-07T14:30:00+00:00`

### Date

```
2020-08-07
```

➡️ August 7, 2020

### Local time info

```
14:30
```

➡️ 2:30pm in an unspecified timezone.

Specifying a timezone without a date is often not very valuable, because the time will be convertable to UTC and to other timezone offsets, but it will be impossible to determine the correct timezone offset for a specific location due to [DST](https://en.wikipedia.org/wiki/Daylight_saving_time) influencing the timezone offsets of various locations depending on the exact date.

For example, if the time info is `14:30+00:00` (UTC) it's impossible to determine what the time info will be in the `Europe/Brussels` timezone. Because that timezone switches between the `+01:00` and `+02:00` offsets depending on DST, so we'd need to know what date the time info applies to.

Additionally if the time info applies to for example a recurrent opening/closing hour, it's offset from UTC could also vary depending on the date. For example if the daily opening hour of a location is `14:30` for a location in Brussels, it's opening hour would be `14:30+01:00` or `14:30+02:00` depending on the exact date.

For these reasons time info without a date should almost always be specified without a timezone offset. Documentation should clarify if the time info is in the UTC timezone or some local timezone.
