import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = "../../../assets";
  const dayImage = "../../../assets/dayImage";
  ir.addSvgIconSetInNamespace(
    "avatars",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/avatars.svg`)
  );
  ir.addSvgIcon(
    "dianhan",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/dianhan.svg`)
  );
  ir.addSvgIcon("day", ds.bypassSecurityTrustResourceUrl(`${imgDir}/day.svg`));
  ir.addSvgIcon(
    "month",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/month.svg`)
  );
  ir.addSvgIcon(
    "project",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/project.svg`)
  );
  ir.addSvgIcon(
    "week",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/week.svg`)
  );
  ir.addSvgIcon(
    "projects",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/projects.svg`)
  );
  ir.addSvgIcon(
    "move",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/move.svg`)
  );
  ir.addSvgIcon("add", ds.bypassSecurityTrustResourceUrl(`${imgDir}/Add.svg`));
  ir.addSvgIcon(
    "delete",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/delete.svg`)
  );
  ir.addSvgIcon(
    "unassigned",
    ds.bypassSecurityTrustResourceUrl(`${imgDir}/unassigned.svg`)
  );
  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];
  days.forEach(d =>
    ir.addSvgIcon(
      `day${d}`,
      ds.bypassSecurityTrustResourceUrl(`${dayImage}/day${d}.svg`)
    )
  );
};
