#include "migemo.h"
#include <stdio.h>

migemo *migemoOpen(char *dict_path) { return migemo_open(dict_path); }

int migemoRun(migemo *m, char *dict_path, char *query) {
  /* 必要な回数だけqueryを行なう */
  {
    unsigned char *p;
    p = migemo_query(m, query);
    printf("C/Migemo: %s\n", p);
    migemo_release(m, p); /* queryの結果は必ずreleaseする */
  }
  /* 利用し終わったmigemoオブジェクトはcloseする */
  migemo_close(m);
  return 0;
}
