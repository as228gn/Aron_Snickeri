# Manuella Testfall för Kontakt

## 1. Skicka korrekt ifyllt formulär

| Steg | Beskrivning                          | Förväntat resultat                                                |
| ---- | ------------------------------------ | ----------------------------------------------------------------- |
| 1    | Gå till kontaktsidan                 | Ett kontaktformulär visas                                         |
| 2    | Fyll i Namn: Anna Test               | Fältet accepteras                                                 |
| 3    | Fyll i Telefonnummer: 0701234567     | Fältet accepteras                                                 |
| 4    | Fyll i E-post: anna@example.com      | Fältet accepteras                                                 |
| 5    | Fyll i Ärende: Hej, jag har en fråga | Fältet accepteras                                                 |
| 6    | Klicka på "Skicka"                   | Meddelandet skickas, användaren ser en bekräftelse och tack-sida  |

---

## 2. Skicka med endast telefonnummer och ärende

| Steg | Beskrivning                            | Förväntat resultat                                               |
| ---- | -------------------------------------- | ---------------------------------------------------------------- |
| 1    | Gå till kontaktsidan                   | Ett kontaktformulär visas                                        |
| 2    | Lämna Namn tomt                        | Inga felmeddelanden visas                                        |
| 3    | Fyll i Telefonnummer: 0701234567	      | Fältet accepteras                                                |
| 4    | Lämna E-post tomt	                    | Inga felmeddelanden visas                                        |
| 5    | Fyll i Ärende: Hej, jag har en fråga.  | Fältet accepteras                                                |
| 6    | Klicka på "Skicka"                     | Meddelandet skickas, användaren ser en bekräftelse och tack-sida |

---

## 3. Försök att skicka utan telefonnummer

| Steg | Beskrivning                       | Förväntat resultat                                                         |
| ---- | --------------------------------- | -------------------------------------------------------------------------- |
| 1    | Gå till kontaktsidan              | Ett kontaktformulär visas                                                  |
| 2    | Fyll i Namn, E-post och Ärende    | Fälten accepteras                                                          |
| 3    | Lämna Telefonnummer tomt          | Inga felmeddelanden visas                                                  |
| 4    | Klicka på "Skicka" | Formuläret stoppas, ett felmeddelande visas om att användaren måste fylla i telefonnummer |

---

## 4. Försök att skicka utan Ärende

| Steg | Beskrivning                            | Förväntat resultat                                               |
| ---- | --------------------------------- -----| ---------------------------------------------------------------- |
| 1    | Gå till kontaktsidan                   | Ett kontaktformulär visas                                        |
| 2    | Fyll i Namn, E-post och Telefonnummer  | Fälten accepteras                                                |
| 3    | Lämna Ärende tomt                      | Inga felmeddelanden visas                                        |
| 4    | Klicka på "Skicka"   | Formuläret stoppas, ett felmeddelande visas om att användaren måste fylla i Ärende |

---

## 5. Ogiltig e-postadress

| Steg | Beskrivning                         | Förväntat resultat                          |
| ---- | ----------------------------------- | ------------------------------------------- |
| 1    | Gå till kontaktsidan                | Ett kontaktformulär visas                   |
| 2    | Fyll i Telefonnummer                | Användaren tas tillbaka till produktlistan  |
| 3    | Fyll i E-post: fel.adress (utan @)  | Felmeddelande om att @ måste fyllas i visas |

---

## 6. HTML/JS injection

| Steg | Beskrivning                                         | Förväntat resultat                               |
| ---- | --------------------------------------------------- | ------------------------------------------------ |
| 1    | Gå till kontaktsidan                                | Ett kontaktformulär visas                        |
| 2    | Fyll i Telefonnummer: 0701234567                    | Fälten accepteras                                |
| 3    | Fyll i Meddelande: <script>alert('hej')</script>    | Innehållet tolkas som text, inte körbar kod      |
| 4    | Klicka på "Skicka"                                  | Formuläret skickas utan att JavaScript exekveras |

---