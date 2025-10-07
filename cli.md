# API

-   `ascii` - Вывод всей таблицы
-   `ascii <from> <to>` - Вывод таблицы в диапазоне from-to
-   `ascii char <char>` - Вывод записи из таблицы по указаному символу
-   `ascii bin <code>` - Вывод записи из таблицы по указаному коду
-   `ascii oct <code>` - Вывод записи из таблицы по указаному коду
-   `ascii dec <code>` - Вывод записи из таблицы по указаному коду
-   `ascii hex <code>` - Вывод записи из таблицы по указаному коду
-   `ascii desc <desc>` - Вывод записи из таблицы по указаному описанию

```bash
# By code:
$~ ascii bin 01000001
$~ ascii oct 101
$~ ascii dec 65
$~ ascii hex 41

# By char:
$~ ascii char A
$~ ascii char NUL

# By description:
$~ ascii desc "Null character"
```
