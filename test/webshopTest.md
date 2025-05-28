# Manuella Testfall för Webshop

## 1. Lägg till vara i varukorg

| Steg | Beskrivning                               | Förväntat resultat                         |
| ---- | ----------------------------------------- | ------------------------------------------ |
| 1    | Gå till webshopsidan                      | Produkter visas i ett grid                 |
| 2    | Klicka på "Lägg i varukorg" på en produkt | Samma vy laddas om                         |
| 3    | Kontrollera varukorgsikonen i headern     | Ikonen visar siffran `1`                   |

---

## 2. Ändra kvantitet i varukorgen

| Steg | Beskrivning                               | Förväntat resultat                        |
| ---- | ----------------------------------------- | ----------------------------------------- |
| 1    | Gör testfall 1.1-1.3                      |                                           |
| 2    | Gå till varukorgssidan                    | En lista med produkter i varukorgen visas |
| 3    | Klicka på `+` för att öka kvantiteten     | Kvantitet ökar med 1, upp till 2          |
| 4    | Kontrollera varukorgsikonen i headern     | Siffran i ikonen uppdateras korrekt       |
| 5    | Klicka på `-` för att minska kvantiteten  | Kvantiteten minskar med 1, ner till 1     |
| 6    | Klicka `-` igen om kvantiteten är 1       | Produkten tas bort helt från varukorgen   |
| 7    | Kontrollera att siffran i headern minskar | Ikonen visar rätt antal                   |

---

## 3. Gå till varukorg via ikon i header

| Steg | Beskrivning                       | Förväntat resultat                         |
| ---- | --------------------------------- | ------------------------------------------ |
| 1    | Gör testfall 1.1-1.3              |                                            |
| 2    | Klicka på varukorgsikonen         | Användaren tas till varukorgssidan         |
| 3    | Kontrollera att produkterna visas | Rätt produkter med korrekt kvantitet visas |

---

## 4. Fortsätt handla

| Steg | Beskrivning                 | Förväntat resultat                         |
| ---- | --------------------------- | ------------------------------------------ |
| 1    | Gör testfall 1.1-1.3        |                                            |
| 2    | Gå till varukorgssidan      | Produkter listas                           |
| 3    | Klicka på "Fortsätt handla" | Användaren tas tillbaka till webshopssidan |
| 4    | Lägg till en ny produkt     | Antal i korgen uppdateras korrekt          |

---

## 5. Gå till kassa

| Steg | Beskrivning                | Förväntat resultat                                              |
| ---- | -------------------------- | --------------------------------------------------------------- |
| 1    | Gör testfall 1.1-1.3       |                                                                 |
| 2    | Gå till varukorgssidan     | Produkter listas                                                |
| 3    | Klicka på "Gå till kassan" | Användaren omdirigeras till Shopify-checkout                    |
| 4    | Kontrollera URL\:en        | URL börjar med `https://xinwyp-x3.myshopify.com/checkouts`      |

---

## 6. Testa att inte kvantitet "fastnar" vid backa

| Steg | Beskrivning                                   | Förväntat resultat                  |
| ---- | --------------------------------------------- | ----------------------------------- |
| 1    | Gå till webshopsidan → Lägg till 1 vara       | Ikonen visar `1`                    |
| 2    | Gå till varukorg → tryck `+`                  | Ikonen visar`2`                     |
| 3    | Klicka "Tillbaka" i browsern                  | Ikonen ska fortfarande visa `2`     |
| 4    | Ladda om startsidan                           | Ikonen ska fortfarande visa `2`     |

---