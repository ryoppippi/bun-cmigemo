#include <stdio.h>
#include "migemo.h"

migemo* migemoOpen(char* dict_path) {
  migemo *m;
  m = migemo_open(NULL);
  migemo_load(m, MIGEMO_DICTID_MIGEMO, dict_path);
  return m;
}
int migemoRun(char* dict_path, char *query) {
  migemo *m = migemoOpen(dict_path);
  /* 必要な回数だけqueryを行なう */
  {
    unsigned char* p;
    p = migemo_query(m, query);
    printf("C/Migemo: %s\n", p);
    migemo_release(m, p); /* queryの結果は必ずreleaseする */
  }
  /* 利用し終わったmigemoオブジェクトはcloseする */
  migemo_close(m);
  return 0;
}

