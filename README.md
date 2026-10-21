# Objavko

Hravé učenie pre materské školy: interaktívne hry podľa ŠVP pre MŠ, vlastné triedy učiteliek a prehľad pokroku detí.

Beží na [carozvedko.vercel.app](https://carozvedko.vercel.app). Každá zmena v tomto repozitári sa na Verceli nasadí automaticky.

Postavené na Next.js (web) a Supabase (prihlásenie a databáza so serverom v EÚ). Hostuje sa na Verceli.

## Čo aplikácia vie (verzia 0.1)

- Registrácia a prihlásenie učiteľky (e-mail a heslo).
- Učiteľka si založí jednu alebo viac tried a pridá do nich žiakov (meno alebo prezývka a ikonka).
- 5 hier s hlasovými pokynmi v slovenčine: Pexeso, Koľko ich je?, Farbičky, Čí je to tieň?, Prvé písmenko.
- Výsledky sa ukladajú a učiteľka vidí pokrok každého dieťaťa.
- Každá učiteľka vidí iba svoje triedy (zabezpečené v databáze).

## Spustenie krok za krokom

1. **Supabase:** na [supabase.com](https://supabase.com) založ projekt, región *Central EU (Frankfurt)*.
   V časti *SQL Editor* spusti celý súbor `supabase/schema.sql`.
2. **Vercel:** na [vercel.com](https://vercel.com) sa prihlás cez GitHub, klikni *Add New → Project* a vyber repozitár `objavko`.
   Adresa a verejný kľúč Supabase sú v `lib/supabase/config.ts`. Pre iný projekt ich prepíšu premenné `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY` v *Environment Variables*.
3. V Supabase → *Authentication → URL Configuration* nastav *Site URL* na adresu z Vercelu (neskôr `https://objavko.sk`).

## Vývoj na vlastnom počítači

```bash
npm install
cp .env.example .env.local   # doplň hodnoty zo Supabase
npm run dev                  # http://localhost:3000
```
