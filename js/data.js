/* ============================================================
   Casalá — sample data
   This is placeholder data. When you wire up Firebase, replace
   getListings() with a Firestore query. The app code doesn't
   need to change — it just calls getListings().
   ============================================================ */

const PROPERTY_IMAGES = ["data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRUZFN0Q2Ii8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFOERDQzciLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjEyMCIgeT0iMTUwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI5MCIgcng9IjYiIGZpbGw9IiNGMEU2RDQiLz4KICAgICAgICA8cmVjdCB4PSIxMjAiIHk9IjE1MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0E2NTAyRiIvPgogICAgICAgIDxyZWN0IHg9IjE0NSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNUU3MzU1IiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjA1IiB5PSIyMTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM1RTczNTUiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyNjUiIHk9IjIxMCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjMyNSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNUU3MzU1IiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMTQ1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM1RTczNTUiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyMDUiIHk9IjI4MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjI2NSIgeT0iMjgwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNUU3MzU1IiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMzI1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM1RTczNTUiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIxNDUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjIwNSIgeT0iMzUwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNUU3MzU1IiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjY1IiB5PSIzNTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM1RTczNTUiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIzMjUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC44NSIvPgogICAgICAgIDxyZWN0IHg9IjIyNSIgeT0iMzk1IiB3aWR0aD0iNTAiIGhlaWdodD0iNDUiIHJ4PSIzIiBmaWxsPSIjQTY1MDJGIi8+Cjwvc3ZnPg==", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRURFNEQwIi8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iI0M1NkI0QSIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFNEQ5QzAiLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iI0M1NkI0QSIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iI0M1NkI0QSIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjExMCIgeT0iMjcwIiB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE3MCIgcng9IjYiIGZpbGw9IiNGMkVBREEiLz4KICAgICAgICA8cG9seWdvbiBwb2ludHM9Ijk1LDI3MCAyNTAsMTcwIDQwNSwyNzAiIGZpbGw9IiM3QTNCMjQiLz4KICAgICAgICA8cmVjdCB4PSIxNTAiIHk9IjMxMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iI0M1NkI0QSIgb3BhY2l0eT0iMC44NSIvPgogICAgICAgIDxyZWN0IHg9IjI5MCIgeT0iMzEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSI0IiBmaWxsPSIjQzU2QjRBIiBvcGFjaXR5PSIwLjg1Ii8+CiAgICAgICAgPHJlY3QgeD0iMjI1IiB5PSIzNjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI4MCIgcng9IjQiIGZpbGw9IiM3QTNCMjQiLz4KPC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRUNFM0QxIi8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFOERDQzciLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjEyMCIgeT0iMTUwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI5MCIgcng9IjYiIGZpbGw9IiNGMEU4RDgiLz4KICAgICAgICA8cmVjdCB4PSIxMjAiIHk9IjE1MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzQ2NTgzRiIvPgogICAgICAgIDxyZWN0IHg9IjE0NSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjRDlBNDQxIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjA1IiB5PSIyMTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiNEOUE0NDEiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyNjUiIHk9IjIxMCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjMyNSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjRDlBNDQxIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMTQ1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiNEOUE0NDEiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyMDUiIHk9IjI4MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjI2NSIgeT0iMjgwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjRDlBNDQxIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMzI1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiNEOUE0NDEiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIxNDUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjIwNSIgeT0iMzUwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjRDlBNDQxIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjY1IiB5PSIzNTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiNEOUE0NDEiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIzMjUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iI0Q5QTQ0MSIgb3BhY2l0eT0iMC44NSIvPgogICAgICAgIDxyZWN0IHg9IjIyNSIgeT0iMzk1IiB3aWR0aD0iNTAiIGhlaWdodD0iNDUiIHJ4PSIzIiBmaWxsPSIjNDY1ODNGIi8+Cjwvc3ZnPg==", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRUZFN0Q1Ii8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFNEQ5QzAiLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iIzVFNzM1NSIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjEyMCIgeT0iMjUwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjE5MCIgcng9IjYiIGZpbGw9IiNGMkVCREIiLz4KICAgICAgICA8cG9seWdvbiBwb2ludHM9IjExMCwyNTAgMjUwLDE4MCAzOTAsMjUwIiBmaWxsPSIjQzU2QjRBIi8+CiAgICAgICAgPHJlY3QgeD0iMTYwIiB5PSIzMDAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcng9IjQiIGZpbGw9IiM1RTczNTUiIG9wYWNpdHk9IjAuODUiLz4KICAgICAgICA8cmVjdCB4PSIyODAiIHk9IjMwMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjE0MCIgcng9IjQiIGZpbGw9IiNDNTZCNEEiLz4KPC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRURFNEQyIi8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iI0E2NTAyRiIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFOERDQzciLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iI0E2NTAyRiIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iI0E2NTAyRiIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjExMCIgeT0iMjcwIiB3aWR0aD0iMjgwIiBoZWlnaHQ9IjE3MCIgcng9IjYiIGZpbGw9IiNGMEU2RDIiLz4KICAgICAgICA8cG9seWdvbiBwb2ludHM9Ijk1LDI3MCAyNTAsMTcwIDQwNSwyNzAiIGZpbGw9IiM1RTczNTUiLz4KICAgICAgICA8cmVjdCB4PSIxNTAiIHk9IjMxMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0iI0E2NTAyRiIgb3BhY2l0eT0iMC44NSIvPgogICAgICAgIDxyZWN0IHg9IjI5MCIgeT0iMzEwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSI0IiBmaWxsPSIjQTY1MDJGIiBvcGFjaXR5PSIwLjg1Ii8+CiAgICAgICAgPHJlY3QgeD0iMjI1IiB5PSIzNjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI4MCIgcng9IjQiIGZpbGw9IiM1RTczNTUiLz4KPC9zdmc+", "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiB2aWV3Qm94PSIwIDAgNTAwIDM4MCI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjRUVFNUQzIi8+CjxjaXJjbGUgY3g9IjQyMCIgY3k9IjcwIiByPSIzOCIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC4zNSIvPgo8cmVjdCB4PSIwIiB5PSIzMDAiIHdpZHRoPSI1MDAiIGhlaWdodD0iODAiIGZpbGw9IiNFNEQ5QzAiLz4KPGVsbGlwc2UgY3g9IjYwIiBjeT0iNDMwIiByeD0iOTAiIHJ5PSI2MCIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC4yNSIvPgo8ZWxsaXBzZSBjeD0iNDUwIiBjeT0iNDQwIiByeD0iOTAiIHJ5PSI1NSIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC4yIi8+CgogICAgICAgIDxyZWN0IHg9IjEyMCIgeT0iMTUwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjI5MCIgcng9IjYiIGZpbGw9IiNGMkVBREEiLz4KICAgICAgICA8cmVjdCB4PSIxMjAiIHk9IjE1MCIgd2lkdGg9IjI2MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0E2NTAyRiIvPgogICAgICAgIDxyZWN0IHg9IjE0NSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNDY1ODNGIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjA1IiB5PSIyMTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM0NjU4M0YiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyNjUiIHk9IjIxMCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjMyNSIgeT0iMjEwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNDY1ODNGIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMTQ1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM0NjU4M0YiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIyMDUiIHk9IjI4MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjI2NSIgeT0iMjgwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNDY1ODNGIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMzI1IiB5PSIyODAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM0NjU4M0YiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIxNDUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC44NSIvPjxyZWN0IHg9IjIwNSIgeT0iMzUwIiB3aWR0aD0iMzgiIGhlaWdodD0iNDQiIHJ4PSIzIiBmaWxsPSIjNDY1ODNGIiBvcGFjaXR5PSIwLjg1Ii8+PHJlY3QgeD0iMjY1IiB5PSIzNTAiIHdpZHRoPSIzOCIgaGVpZ2h0PSI0NCIgcng9IjMiIGZpbGw9IiM0NjU4M0YiIG9wYWNpdHk9IjAuODUiLz48cmVjdCB4PSIzMjUiIHk9IjM1MCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjQ0IiByeD0iMyIgZmlsbD0iIzQ2NTgzRiIgb3BhY2l0eT0iMC44NSIvPgogICAgICAgIDxyZWN0IHg9IjIyNSIgeT0iMzk1IiB3aWR0aD0iNTAiIGhlaWdodD0iNDUiIHJ4PSIzIiBmaWxsPSIjQTY1MDJGIi8+Cjwvc3ZnPg=="];

const LISTINGS = [
  { id:"p1", price:12000, title:"Depa luminoso en Providencia", zone:"Providencia", city:"Guadalajara",
    desc:"2° piso con elevador. Cocina integral, balcón y vigilancia 24/7.",
    beds:2, baths:2, park:1, floor:2, elevator:true, tag:"Nuevo", img:0, available:true,
    features:["Pet friendly"],
    amenities:["Elevador","Cocina integral","Balcón","Vigilancia 24/7","Pet friendly"],
    agent:{name:"Ivan Espino", role:"Propietario", initials:"IE"} },
  { id:"p2", price:9000, title:"Casa en Chapalita", zone:"Chapalita", city:"Guadalajara",
    desc:"Planta baja, patio propio y un cajón. Ideal para mascota pequeña.",
    beds:2, baths:1, park:1, floor:0, elevator:false, tag:"Pet friendly", img:1, available:true,
    features:["Pet friendly"],
    amenities:["Patio propio","Planta baja","Pet friendly","Cocina equipada"],
    agent:{name:"Laura M.", role:"Propietaria", initials:"LM"} },
  { id:"p3", price:22000, title:"Penthouse en Andares", zone:"Andares", city:"Zapopan",
    desc:"3° piso con elevador. Roof garden, gimnasio y dos cajones techados.",
    beds:3, baths:2, park:2, floor:3, elevator:true, tag:"Premium", img:2, available:true,
    features:["Premium"],
    amenities:["Elevador","Roof garden","Gimnasio","2 cajones techados","Seguridad"],
    agent:{name:"Grupo Habitar", role:"Inmobiliaria", initials:"GH"} },
  { id:"p4", price:7500, title:"Estudio en Americana", zone:"Americana", city:"Guadalajara",
    desc:"Planta baja céntrica, amueblado y listo para entrar. Cerca de todo.",
    beds:0, baths:1, park:0, floor:0, elevator:false, tag:"Amueblado", img:3, available:true,
    features:["Amueblado"],
    amenities:["Amueblado","Planta baja","Internet incluido","Céntrico"],
    agent:{name:"Carlos R.", role:"Propietario", initials:"CR"} },
  { id:"p5", price:16000, title:"Casa en Valle Real", zone:"Valle Real", city:"Zapopan",
    desc:"Dos plantas, jardín y cochera para dos autos. Coto con seguridad.",
    beds:3, baths:3, park:2, floor:0, elevator:false, tag:"En coto", img:4, available:true,
    features:["En coto"],
    amenities:["Jardín","Coto privado","Seguridad","2 autos","2 plantas"],
    agent:{name:"Grupo Habitar", role:"Inmobiliaria", initials:"GH"} },
  { id:"p6", price:10500, title:"Depa en Zapopan Centro", zone:"Centro", city:"Zapopan",
    desc:"1° piso, sin elevador. Recién remodelado, mucha luz natural.",
    beds:2, baths:1, park:1, floor:1, elevator:false, tag:"Remodelado", img:5, available:true,
    features:["Remodelado"],
    amenities:["Remodelado","Mucha luz","1 cajón","Cocina nueva"],
    agent:{name:"Ana T.", role:"Propietaria", initials:"AT"} },
  { id:"p7", price:13500, title:"Depa moderno en Providencia", zone:"Providencia", city:"Guadalajara",
    desc:"4° piso con elevador. Amplio, con terraza y bodega privada.",
    beds:2, baths:2, park:1, floor:4, elevator:true, tag:"Disponible", img:0, available:true,
    features:["Remodelado"],
    amenities:["Elevador","Terraza","Bodega","Amplio"],
    agent:{name:"Laura M.", role:"Propietaria", initials:"LM"} },
  { id:"p8", price:8500, title:"Casa pequeña en Chapalita", zone:"Chapalita", city:"Guadalajara",
    desc:"Planta baja con jardín chico. Tranquila y bien ubicada.",
    beds:1, baths:1, park:1, floor:0, elevator:false, tag:"Tranquila", img:1, available:true,
    features:["Pet friendly"],
    amenities:["Jardín","Planta baja","1 cajón"],
    agent:{name:"Carlos R.", role:"Propietario", initials:"CR"} },
  { id:"p9", price:25000, title:"Penthouse de lujo en Andares", zone:"Andares", city:"Zapopan",
    desc:"Piso alto con elevador. Vista panorámica, alberca y gimnasio.",
    beds:3, baths:3, park:2, floor:8, elevator:true, tag:"Premium", img:2, available:true,
    features:["Premium", "En coto"],
    amenities:["Elevador","Alberca","Gimnasio","Vista panorámica","Seguridad"],
    agent:{name:"Grupo Habitar", role:"Inmobiliaria", initials:"GH"} }
];

/* The app calls this. Swap the body for a Firestore query later. */
async function getListings(){
  return LISTINGS;
}
async function getListingById(id){
  return LISTINGS.find(l => l.id === id);
}
