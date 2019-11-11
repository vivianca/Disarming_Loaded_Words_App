# Disarming Loaded Words App

This repository will hold all collaborative contributions to the Disarming Loaded Words plugin.

Make all edits to the code here to avoid merge conflicts (which abound and are unflagged in the GDocs script editor!). Use the script editor IDE only as a test tool.

## Current status:

The plugin can accurately highlight the biased word in any paragraph which has only one biased word.

## Next steps:

### Wizard of Oz prototype:
- handle case of multiple biased words in a row or in the same paragraph
  - plugin will currently only highlight the first instance of latest word in the biased-word-list because of the iteration logic
- handle capital/lowercase regex

### [on completion of backend API] Integrate backend
