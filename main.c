#include "migemo.h"

typedef void (*StringCallback)(const unsigned char *);

migemo *migemoOpen(char *dict_path) { return migemo_open(dict_path); }

int migemoClose(migemo *m) {
  migemo_close(m);
  return 0;
}

int migemoQuery(migemo *m, char *query, StringCallback callback) {
  unsigned char *p;
  p = migemo_query(m, query);
  callback(p);
  migemo_release(m, p);
  return 0;
}
