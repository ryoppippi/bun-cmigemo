#include "migemo.h"
#include <stdio.h>

int migemoRun(char *dict_path, char *query) {
  migemo *m;
  m = migemo_open(dict_path);

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
