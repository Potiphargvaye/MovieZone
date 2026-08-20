# Replacing placeholder art with the real Figma exports

Every poster / backdrop in the app currently renders as a solid-color block
(sampled from the actual artwork's dominant color in Figma) instead of a
real image, since no image exports were available while this was built.
Nothing will look "broken" if you run the app right now — colors and layout
already match the design, only the pictures themselves are placeholders.

## 1. Splash screen backdrop

File: `app/index.tsx`

```ts
// Real asset: assets/images/image1.png (movie poster collage backdrop).
const backdrop: number | null = null;
```

Save your export as `assets/images/image1.png`, then change that line to:

```ts
const backdrop: number | null = require('@/assets/images/image1.png');
```

## 2. Movie posters / backdrops

File: `data/movies.ts`

Each movie object has a `poster: null` and `backdrop: null` field. Once you
have exported images for each title, replace `null` with a `require(...)`
call, e.g.:

```ts
{
  id: 'blade-runner-2049',
  ...
  poster: require('@/assets/images/image2.png'),
  backdrop: require('@/assets/images/image3.png'),
},
```

Suggested mapping based on the order posters appear in the Figma frames
(adjust to match your actual exported filenames):

| Figma slot                         | Suggested filename | Used in `data/movies.ts` |
|-------------------------------------|---------------------|---------------------------|
| Splash background collage           | `image1.png`        | `app/index.tsx`           |
| Blade Runner 2049 — hero/backdrop   | `image2.png`        | `movies[0].backdrop`      |
| Blade Runner 2049 — small poster    | `image3.png`        | `movies[0].poster`        |
| Dune — poster                       | `image4.png`        | `movies[1].poster`        |
| Top Gun: Maverick — poster          | `image5.png`        | `movies[2].poster`        |
| Asteroid City — poster              | `image6.png`        | `movies[3].poster`        |
| Her — poster                        | `image7.png`        | `movies[4].poster`        |
| Profile avatar (Marybeth Walker)    | `image8.png`        | `app/(tabs)/profile.tsx`  |

`PosterCard` and the Home/Detail/Seat screens already read from
`movie.poster` / `movie.backdrop` and will automatically switch from the
color placeholder to the real image as soon as it's non-null — no other
code changes needed.

## 3. Profile avatar

File: `app/(tabs)/profile.tsx`

```tsx
<View style={styles.avatar}>
  <Ionicons name="person" size={40} color={Colors.textMuted} />
</View>
```

Replace with:

```tsx
<Image source={require('@/assets/images/image8.png')} style={styles.avatar} />
```

(and add `Image` to the `react-native` import at the top of the file).

## Why placeholders instead of leaving `require()` calls in place?

React Native's bundler resolves `require()` paths at build time — a
`require()` pointing at a file that doesn't exist yet would crash Metro
immediately and the app wouldn't run at all. Solid-color placeholders keep
the app fully runnable today, matching the approach already used on the
StreamFlix web project.
